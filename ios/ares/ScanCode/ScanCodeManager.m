//
//  ScanCodeController.m
//  ares
//
//  Created by Tinklin on 2016/10/31.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ScanCodeManager.h"
#import "LXDScanCodeController.h"
#import <AVFoundation/AVFoundation.h>
#import "AppDelegate.h"
#import "PresentTransition.h"
#import "DismissTransition.h"
#import <React/RCTEventDispatcher.h>

@interface ScanCodeManager ()<LXDScanCodeControllerDelegate,UIViewControllerTransitioningDelegate>
@property (nonatomic, retain) UIPercentDrivenInteractiveTransition * percentDrivenTransition;

@end

@implementation ScanCodeManager
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(scanStart:(NSString *)msg) {
  NSLog(@"%@",msg);
  LXDScanCodeController * scanCodeController = [LXDScanCodeController scanCodeController];
  scanCodeController.scanDelegate = self;
  scanCodeController.transitioningDelegate = self; // 必须second同样设置delegate才有动画
  [[self getAppDelegate].window.rootViewController presentViewController:scanCodeController animated:YES completion:nil];
}
- (AppDelegate *)getAppDelegate {
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  return app;
}
- (NSArray<NSString *> *)supportedEvents{
  return @[@"scanCodeController"];
}
//扫码回调
- (void)scanCodeController:(LXDScanCodeController *)scanCodeController codeInfo:(NSString *)codeInfo
{
  //[self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder" body:@{@"name":@"hahahaha"}];
  NSArray *messageArray = [codeInfo componentsSeparatedByString:@"_"];
  NSLog(@"%@",messageArray);
  NSLog(@"%@",codeInfo);
  [self sendEventWithName:@"scanCodeController"
                     body:@{
                            @"brano": messageArray[0],
                            @"custno":messageArray[1],
                            @"time":messageArray[2],
                            @"way":messageArray[3],
                            @"count":messageArray[4],
                            @"randoncode":messageArray[5],
                            }];
}
// present动画
- (id<UIViewControllerAnimatedTransitioning>)animationControllerForPresentedController:(UIViewController *)presented presentingController:(UIViewController *)presenting sourceController:(UIViewController *)source{
  return [[PresentTransition alloc] init];
}
// dismiss动画
- (id<UIViewControllerAnimatedTransitioning>)animationControllerForDismissedController:(UIViewController *)dismissed{
  return [[DismissTransition alloc] init];
}
#pragma mark - UIViewControllerTransitioningDelegate另外两个方法，返回动画的百分比
// 百分比present
- (id<UIViewControllerInteractiveTransitioning>)interactionControllerForPresentation:(id<UIViewControllerAnimatedTransitioning>)animator{
  return _percentDrivenTransition;
}
// 百分比dismiss
- (id<UIViewControllerInteractiveTransitioning>)interactionControllerForDismissal:(id<UIViewControllerAnimatedTransitioning>)animator{
  return _percentDrivenTransition;
}
@end
