package com.eguma.barcodescanner;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import android.util.Log;

public class BarcodeScannerPackage implements ReactPackage {

    private static final String TAG = "BarcodeScannerPackage";

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        Log.i(TAG, "createNativeModules");
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        Log.i(TAG, "createJSModules");
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(
            ReactApplicationContext reactContext) {
        Log.i(TAG, "createViewManagers");
        return Arrays.<ViewManager>asList(
                new BarcodeScannerManager()
        );
    }
}
