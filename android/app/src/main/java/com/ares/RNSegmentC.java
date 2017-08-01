package com.ares;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by Administrator on 2017/3/2 0002.
 */

public class RNSegmentC extends SimpleViewManager {
    private ThemedReactContext mContext;

    @Override
    public String getName() {
        return "RNSegmentC";
    }

    @Override
    protected SegmentControlView createViewInstance(ThemedReactContext reactContext) {
        mContext=reactContext;
        String[] a = {"优惠信息","网友评价","商家信息"};
        SegmentControlView segmentControlView = new SegmentControlView(mContext);
        segmentControlView.setBackgroundColor(0xffffffff,0xfff5787c);
        segmentControlView.setTexts(a);
        segmentControlView.setTextColor(0xfff5787c,0xffffffff);
        segmentControlView.setmFrameCornerRadius(18);
        segmentControlView.setGradient(true);
        return segmentControlView;
    }
    @ReactProp(name="setSource")
    public void setSource(SegmentControlView view,int textsize){
        view.setTextSize(textsize);

    }
}
