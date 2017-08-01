package com.eguma.barcodescanner;

import android.content.Context;
import android.graphics.PixelFormat;
import android.hardware.Camera;
import android.os.Build;
import android.util.Log;
import android.view.Surface;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.WindowManager;
import android.view.Display;
import android.os.Handler;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.PlanarYUVLuminanceSource;
import com.google.zxing.ReaderException;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;

import java.lang.reflect.Method;

public class CameraPreview extends SurfaceView implements SurfaceHolder.Callback {
    private CameraManager mCameraManager;
    private Camera mCamera;

    private String mCameraType;
    private Camera.PreviewCallback mPreviewCallback;

    private Handler mAutoFocusHandler;
    private boolean mSurfaceCreated;
    private boolean mPreviewing = true;
    private boolean mAutoFocus = true;
    Camera.Parameters parameters;

    private static final String TAG = "CameraPreview";

    public CameraPreview(Context context, Camera.PreviewCallback previewCallback) {
        super(context);
        Log.i(TAG, "new");

        mCameraManager = new CameraManager();
        mAutoFocusHandler = new Handler();
        mPreviewCallback = previewCallback;
    }

    protected void onAttachedToWindow () {
        super.onAttachedToWindow();
        Log.i(TAG, "onAttachedToWindow");
    }

    protected void onDetachedFromWindow () {
        super.onDetachedFromWindow();
        Log.i(TAG, "onDetachedFromWindow");
    }

    public void startCamera() {
        Log.i(TAG, "startCamera 111");
        mCamera = mCameraManager.getCamera(mCameraType);
        startCameraPreview();
    }

    public void stopCamera() {
        Log.i(TAG, "stopCamera");
        stopCameraPreview();
        mCameraManager.releaseCamera();
    }

    public void setCameraType(String cameraType) {
        mCameraType = cameraType;
    }

    public void startCameraPreview() {
        Log.i(TAG, "startCameraPreview");
        if(mCamera != null) {
            try {
                mPreviewing = true;
                getHolder().addCallback(this);
                mCamera.setPreviewDisplay(getHolder());
                mCamera.setDisplayOrientation(getDisplayOrientation());
                mCamera.setPreviewCallback(mPreviewCallback);
                mCamera.startPreview();
                if(mAutoFocus) {
                    if (mSurfaceCreated) { // check if surface created before using autofocus
                        safeAutoFocus();
                    } else {
                        scheduleAutoFocus(); // wait 1 sec and then do check again
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, e.toString(), e);
            }
        }
    }

    public void stopCameraPreview() {
        Log.i(TAG, "stopCameraPreview");
        if(mCamera != null) {
            try {
                mPreviewing = false;
                getHolder().removeCallback(this);
                mCamera.cancelAutoFocus();
                mCamera.setPreviewCallback(null);
                mCamera.stopPreview();
            } catch(Exception e) {
                Log.e(TAG, e.toString(), e);
            }
        }
    }

    public int getDisplayOrientation() {
        Camera.CameraInfo info = new Camera.CameraInfo();
        Camera.getCameraInfo(Camera.CameraInfo.CAMERA_FACING_BACK, info);
        WindowManager wm = (WindowManager) getContext().getSystemService(Context.WINDOW_SERVICE);
        Display display = wm.getDefaultDisplay();

        int rotation = display.getRotation();
        int degrees = 0;
        switch (rotation) {
            case Surface.ROTATION_0: degrees = 0; break;
            case Surface.ROTATION_90: degrees = 90; break;
            case Surface.ROTATION_180: degrees = 180; break;
            case Surface.ROTATION_270: degrees = 270; break;
        }

        int result;
        if (info.facing == Camera.CameraInfo.CAMERA_FACING_FRONT) {
            result = (info.orientation + degrees) % 360;
            result = (360 - result) % 360;  // compensate the mirror
        } else {  // back-facing
            result = (info.orientation - degrees + 360) % 360;
        }
        return result;
    }

    public void safeAutoFocus() {
        try {

            mCamera.autoFocus(autoFocusCB);
        } catch (RuntimeException re) {
            // Horrible hack to deal with autofocus errors on Sony devices
            // See https://github.com/dm77/barcodescanner/issues/7 for example
            scheduleAutoFocus(); // wait 1 sec and then do check again
        }
    }

    public void setAutoFocus(boolean state) {
        if(mCamera != null && mPreviewing) {
            if(state == mAutoFocus) {
                return;
            }
            mAutoFocus = state;
            if(mAutoFocus) {
                if (mSurfaceCreated) { // check if surface created before using autofocus
                    Log.v(TAG, "Starting autofocus");
                    safeAutoFocus();
                } else {
                    scheduleAutoFocus(); // wait 1 sec and then do check again
                }
            } else {
                Log.v(TAG, "Cancelling autofocus");
                mCamera.cancelAutoFocus();
            }
        }
    }

    private Runnable doAutoFocus = new Runnable() {
        public void run() {
            if(mCamera != null && mPreviewing && mAutoFocus && mSurfaceCreated) {
                safeAutoFocus();
            }
        }
    };

    // Mimic continuous auto-focusing
    Camera.AutoFocusCallback autoFocusCB = new Camera.AutoFocusCallback() {
        public void onAutoFocus(boolean success, Camera camera) {
            if(success){
                initCamera();//实现相机的参数初始化
                camera.cancelAutoFocus();//只有加上了这一句，才会自动对焦。
            }
         //   scheduleAutoFocus();
        }
    };
    private void initCamera()
    {
        parameters=mCamera.getParameters();
        parameters.setPictureFormat(PixelFormat.JPEG);
        //parameters.setPictureSize(surfaceView.getWidth(), surfaceView.getHeight());  // 部分定制手机，无法正常识别该方法。
        parameters.setFlashMode(parameters.FLASH_MODE_TORCH);
        parameters.setFocusMode(Camera.Parameters.FOCUS_MODE_AUTO);//1连续对焦
        setDispaly(parameters,mCamera);
        mCamera.setParameters(parameters);
        mCamera.startPreview();
        //mCamera.cancelAutoFocus();// 2如果要实现连续的自动对焦，这一句必须加上

    }

    //实现的图像的正确显示
    private void setDisplayOrientation(Camera camera, int i) {
        Method downPolymorphic;
        try{
            downPolymorphic=camera.getClass().getMethod("setDisplayOrientation", new Class[]{int.class});
            if(downPolymorphic!=null) {
                downPolymorphic.invoke(camera, new Object[]{i});
            }
        }
        catch(Exception e){
            Log.e("Came_e", "图像出错");
        }
    }

    //控制图像的正确显示方向
    private void setDispaly(Camera.Parameters parameters,Camera camera)
    {
        if (Integer.parseInt(Build.VERSION.SDK) >= 8){
            setDisplayOrientation(camera,90);
        }
        else{
            parameters.setRotation(90);
        }

    }

    private void scheduleAutoFocus() {
        mAutoFocusHandler.postDelayed(doAutoFocus, 1000);
    }

    @Override
    public void surfaceCreated(SurfaceHolder holder) {
        Log.i(TAG, "surfaceCreated");
        mSurfaceCreated = true;
        startCamera();
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
        Log.i(TAG, "surfaceDestroyed");
        stopCamera();
    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int w, int h) {
        Log.i(TAG, "surfaceChanged");
        if(holder.getSurface() == null) {
            return;
        }
        if(mCamera != null) {
            try {
                mCamera.setDisplayOrientation(getDisplayOrientation());
            } catch (Exception e) {
                Log.e(TAG, e.toString(), e);
            }
        }
    }

    public void onPause() {
        Log.i(TAG, "onPause");
        stopCameraPreview();
    }

    public void onResume() {
        Log.i(TAG, "onResume");
        startCameraPreview();
    }

    public void setFlash(boolean flag) {
        if(mCamera != null && mCameraManager.isFlashSupported(mCamera)) {
            Camera.Parameters parameters = mCamera.getParameters();
            if(flag) {
                if(parameters.getFlashMode().equals(Camera.Parameters.FLASH_MODE_TORCH)) {
                    return;
                }
                parameters.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);
            } else {
                if(parameters.getFlashMode().equals(Camera.Parameters.FLASH_MODE_OFF)) {
                    return;
                }
                parameters.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
            }
            mCamera.setParameters(parameters);
        }
    }
}
