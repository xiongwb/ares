//
//  FingerPrintManager.m
//  ares
//
//  Created by Tinklin on 2016/10/25.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "FingerPrintManager.h"
#import <React/RCTConvert.h>
#import <LocalAuthentication/LocalAuthentication.h>

@implementation FingerPrintManager
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(authenticateUser:(NSString *)sever and:(RCTResponseSenderBlock)callback){
  //初始化上下文对象
  LAContext* context = [[LAContext alloc] init];
  //错误对象
  NSError* error = nil;
  NSString* result = [NSString stringWithFormat:@"开启%@请验证指纹信息",sever];
  
  //首先使用canEvaluatePolicy 判断设备支持状态
  if ([context canEvaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics error:&error]) {
    //支持指纹验证
    [context evaluatePolicy:LAPolicyDeviceOwnerAuthenticationWithBiometrics localizedReason:result reply:^(BOOL success, NSError *error) {
      if (success) {
        //验证成功，主线程处理UI
        NSLog(@"验证成功");
        NSArray *events = @[@"验证成功"];
        callback(@[[NSNull null], events]);
      }
      else
      {
        NSArray *events = @[@"验证失败"];
        callback(@[[NSNull null], events]);
        
        NSLog(@"%@",error.localizedDescription);
        switch (error.code) {
          case LAErrorSystemCancel:
          {
            NSLog(@"Authentication was cancelled by the system");
            //切换到其他APP，系统取消验证Touch ID
            break;
          }
          case LAErrorUserCancel:
          {
            NSLog(@"Authentication was cancelled by the user");
            //用户取消验证Touch ID
            break;
          }
          case LAErrorUserFallback:
          {
            NSLog(@"User selected to enter custom password");
            [[NSOperationQueue mainQueue] addOperationWithBlock:^{
              //用户选择其他验证方式，切换主线程处理
            }];
            break;
          }
          default:
          {
            [[NSOperationQueue mainQueue] addOperationWithBlock:^{
              //其他情况，切换主线程处理
            }];
            break;
          }
        }
      }
    }];
  }
  else
  {
    //不支持指纹识别，LOG出错误详情
    NSArray *events = @[@"验证失败"];
    callback(@[[NSNull null], events]);

    switch (error.code) {
      case LAErrorTouchIDNotEnrolled:
      {
        NSLog(@"设备TouchID不可用");
        break;
      }
      case LAErrorPasscodeNotSet:
      {
        NSLog(@"系统未设置密码");
        break;
      }
      default:
      {
        NSLog(@"TouchID not available");
        break;
      }
    }
    
    NSLog(@"%@",error.localizedDescription);
    [self showPasswordAlert];
  }
}

- (void)showPasswordAlert {
  NSLog(@"sssd");
}

@end
