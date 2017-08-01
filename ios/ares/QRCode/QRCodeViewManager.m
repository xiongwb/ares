//
//  QRCodeViewManager.m
//  ares
//
//  Created by Tinklin on 2016/10/31.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "QRCodeViewManager.h"
#import "QRCodeView.h"

@interface QRCodeViewManager ()
@property (nonatomic,retain)QRCodeView *qrcode;
@end

@implementation QRCodeViewManager
RCT_EXPORT_MODULE()
- (UIView *)view
{
  _qrcode = [[QRCodeView alloc]init];
  return _qrcode;
}
RCT_EXPORT_VIEW_PROPERTY(message,NSString)
@end
