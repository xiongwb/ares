package com.eguma.barcodescanner;

import android.content.Context;
import android.content.res.Configuration;
import android.hardware.Camera;
import android.hardware.Sensor;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.WindowManager;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.PlanarYUVLuminanceSource;
import com.google.zxing.ReaderException;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;

public class BarcodeScannerView extends FrameLayout implements Camera.PreviewCallback {
    private CameraPreview mPreview;
    private MultiFormatReader mMultiFormatReader;
    private boolean show = false;


    private float viewFinderHeight = -1;
    private float viewFinderWidth  = -1;
    private float viewFinderTopLeftPointX = -1;
    private float viewFinderTopLeftPointY = -1;

    private static final String TAG = "BarcodeScannerView";

    public BarcodeScannerView(Context context) {
        super(context);
        Log.i(TAG, "init start");

        mPreview = new CameraPreview(context, this);
        mMultiFormatReader = new MultiFormatReader();
        this.addView(mPreview);
        Log.i(TAG, "init end");
    }

    protected void onAttachedToWindow () {
        super.onAttachedToWindow();
        this.show = true;
        Log.i(TAG, "onAttachedToWindow");
    }

    protected void onDetachedFromWindow () {
        super.onDetachedFromWindow();
        this.show = false;
        Log.i(TAG, "onDetachedFromWindow");
    }

    public boolean isShow() {
        return this.show;
    }


    public void startCamera(){
        mPreview.startCamera();
    }

    public void onResume() {
        Log.i(TAG, "onResume start");
        mPreview.startCamera(); // workaround for reload js
        // mPreview.onResume();
        Log.i(TAG, "onResume end");
    }

    public void onPause() {
        Log.i(TAG, "onPause start");
        mPreview.stopCamera();  // workaround for reload js
        // mPreview.onPause();
        Log.i(TAG, "onPause end");
    }

    public void setCameraType(String cameraType) {
        mPreview.setCameraType(cameraType);
    }

    public void setFlash(boolean flag) {
        mPreview.setFlash(flag);
    }


    public void setViewFinderHeight(float viewFinderHeight){
      this.viewFinderHeight = viewFinderHeight;
    }

    public void setViewFinderWidth(float viewFinderWidth){
      this.viewFinderWidth = viewFinderWidth;
    }

    public void setViewFinderTopLeftPointX(float viewFinderTopLeftPointX){
      this.viewFinderTopLeftPointX = viewFinderTopLeftPointX;
    }

    public void setViewFinderTopLeftPointY(float viewFinderTopLeftPointY){
      this.viewFinderTopLeftPointY = viewFinderTopLeftPointY;
    }

    public void stopCamera() {
        Log.i(TAG, "stopCamera start");
        mPreview.stopCamera();
        Log.i(TAG, "stopCamera end");
    }

    @Override
    public void onPreviewFrame(byte[] data, Camera camera) {
        try {
            Camera.Parameters parameters = camera.getParameters();
            Camera.Size size = parameters.getPreviewSize();
            int width = size.width;
            int height = size.height;


            DisplayMetrics metrics = new DisplayMetrics();
            WindowManager wm = (WindowManager) getContext().getSystemService(Context.WINDOW_SERVICE);
            wm.getDefaultDisplay().getMetrics(metrics);
            int display_width_dip  = (int) (metrics.widthPixels / metrics.density + 0.5f);
            int display_heigth_dip = (int) (metrics.heightPixels / metrics.density + 0.5f);


            if (DisplayUtils.getScreenOrientation(getContext()) == Configuration.ORIENTATION_PORTRAIT) {
                byte[] rotatedData = new byte[data.length];
                for (int y = 0; y < height; y++) {
                    for (int x = 0; x < width; x++)
                        rotatedData[x * height + height - y - 1] = data[x + y * width];
                }

                int tmp = width;
                width = height;
                height = tmp;
                data = rotatedData;
            }

            Result rawResult = null;

            int source_left = (int)(this.viewFinderTopLeftPointX * width / display_width_dip);
            int source_top  = (int)(this.viewFinderTopLeftPointY * height / display_heigth_dip);

            int source_width  = (int)(this.viewFinderWidth * width / display_width_dip);
            int source_height = (int)(this.viewFinderHeight * height / display_heigth_dip);


            Log.i(TAG, "onPreviewFrame start width " + width);
            Log.i(TAG, "onPreviewFrame start height " + height);
            Log.i(TAG, "viewFinderWidth " + this.viewFinderWidth);
            Log.i(TAG, "viewFinderHeight " + this.viewFinderHeight);
            Log.i(TAG, "viewFinderTopLeftPointX " + this.viewFinderTopLeftPointX);
            Log.i(TAG, "viewFinderTopLeftPointY " + this.viewFinderTopLeftPointY);
            Log.i(TAG, "source_top " + source_top);
            Log.i(TAG, "source_left " + source_left);
            Log.i(TAG, "source_width " + source_width);
            Log.i(TAG, "source_heigth " + source_height);

            PlanarYUVLuminanceSource source = new PlanarYUVLuminanceSource(data, width, height, source_left, source_top, source_width, source_height, false);

            if (source != null) {
                BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
                try {
                    rawResult = mMultiFormatReader.decodeWithState(bitmap);
                } catch (ReaderException re) {
                    // continue
                } catch (NullPointerException npe) {
                    // This is terrible
                } catch (ArrayIndexOutOfBoundsException aoe) {

                } finally {
                    mMultiFormatReader.reset();
                }
            }

            final Result finalRawResult = rawResult;

            if (finalRawResult != null) {
                Log.i(TAG, finalRawResult.getText());
                WritableMap event = Arguments.createMap();
                event.putString("data", finalRawResult.getText());
                event.putString("type", finalRawResult.getBarcodeFormat().toString());
                ReactContext reactContext = (ReactContext)getContext();
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        getId(),
                        "topChange",
                        event);
            }
        } catch(Exception e) {
            // TODO: Terrible hack. It is possible that this method is invoked after camera is released.
            Log.e(TAG, e.toString(), e);
        }
    }
}
