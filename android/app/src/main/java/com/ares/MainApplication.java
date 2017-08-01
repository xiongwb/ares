package com.ares;

import android.app.Application;

import com.burnweb.rnsendintent.RNSendIntentPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.facebook.react.ReactApplication;
import cn.reactnative.modules.wx.WeChatPackage;
import cn.reactnative.modules.weibo.WeiboPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import cn.reactnative.modules.qq.QQPackage;
import com.beefe.picker.PickerViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import cn.reactnative.baidumap.BDMapPackage;







import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;


import java.util.Arrays;
import java.util.List;






public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new WeChatPackage(),
            new WeiboPackage(),
            new VectorIconsPackage(),
            new RNSendIntentPackage(),
            new QQPackage(),
            new PickerViewPackage(),
            new RNDeviceInfo(),
            new BDMapPackage(),
            new BarcodeScannerPackage(),
            new RNSegmentCPackager()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
