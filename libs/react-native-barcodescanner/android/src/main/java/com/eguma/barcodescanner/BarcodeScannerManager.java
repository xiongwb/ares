package com.eguma.barcodescanner;

import android.view.View;

import javax.annotation.Nullable;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import android.util.Log;

import java.util.Map;

public class BarcodeScannerManager extends ViewGroupManager<BarcodeScannerView> implements LifecycleEventListener {
    private static final String REACT_CLASS = "RNBarcodeScannerView";

    private static final String DEFAULT_TORCH_MODE = "off";
    private static final String DEFAULT_CAMERA_TYPE = "back";

    private static final String TAG = "BarcodeScannerManager";

    private BarcodeScannerView mScannerView;
    private boolean mScannerViewVisible;

    public static final String COMMAND_START_CAMERA_NAME = "startCamera";
    public static final int COMMAND_START_CAMERA_ID      = 1;

    public static final String COMMAND_STOP_CAMERA_NAME = "stopCamera";
    public static final int COMMAND_STOP_CAMERA_ID      = 2;

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @ReactProp(name = "torchMode")
    public void setTorchMode(BarcodeScannerView view, @Nullable String torchMode) {
        if (torchMode != null) {
            view.setFlash(torchMode.equals("on"));
        }
    }

    @ReactProp(name = "viewFinderHeight", defaultFloat = -1)
    public void setViewFinderHeight(BarcodeScannerView view, float viewFinderHeight){
      view.setViewFinderHeight(viewFinderHeight);
    }

    @ReactProp(name = "viewFinderWidth", defaultFloat = -1)
    public void setViewFinderWidth(BarcodeScannerView view, float viewFinderWidth){
      view.setViewFinderWidth(viewFinderWidth);
    }

    @ReactProp(name = "viewFinderTopLeftPointX", defaultFloat = -1)
    public void setViewFinderTopLeftPointX(BarcodeScannerView view, float viewFinderTopLeftPointX){
      view.setViewFinderTopLeftPointX(viewFinderTopLeftPointX);
    }

    @ReactProp(name = "viewFinderTopLeftPointY", defaultFloat = -1)
    public void setViewFinderTopLeftPointY(BarcodeScannerView view, float viewFinderTopLeftPointY){
      view.setViewFinderTopLeftPointY(viewFinderTopLeftPointY);
    }


    @Override
    public BarcodeScannerView createViewInstance(ThemedReactContext context) {
        Log.i(TAG, "createViewInstance start");
        context.addLifecycleEventListener(this);
        mScannerView = new BarcodeScannerView(context);
        mScannerView.setCameraType(DEFAULT_CAMERA_TYPE);
        mScannerView.setFlash(DEFAULT_TORCH_MODE.equals("on"));
        mScannerViewVisible = true;
        Log.i(TAG, "createViewInstance end");
        return mScannerView;
    }

    @Override
    public void onHostResume() {
        Log.i(TAG, "onHostResume");
        if(mScannerView.isShow()){
            mScannerView.onResume();
        }
    }

    @Override
    public void onHostPause() {
        Log.i(TAG, "onHostPause");
        if(mScannerView.isShow()){
            mScannerView.onPause();
        }
    }

    @Override
    public void onHostDestroy() {
        Log.i(TAG, "onHostDestroy");
        mScannerView.stopCamera();
    }

    @Override
    public void addView(BarcodeScannerView parent, View child, int index) {
        parent.addView(child, index + 1);   // index 0 for camera preview reserved
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(
                COMMAND_START_CAMERA_NAME, COMMAND_START_CAMERA_ID,
                COMMAND_STOP_CAMERA_NAME,  COMMAND_STOP_CAMERA_ID
        );
    }

    @Override
    public void receiveCommand(BarcodeScannerView view, int commandId, @Nullable ReadableArray args) {
        Log.i(TAG, commandId + "");
        if(commandId == COMMAND_START_CAMERA_ID){
            view.startCamera();
        }

        if(commandId == COMMAND_STOP_CAMERA_ID){
            view.stopCamera();
        }
    }
}
