//
//  CustomViewControllerTransition.m
//  转场动画
//
//  Created by 霍文轩 on 15/10/30.
//  Copyright © 2015年 霍文轩. All rights reserved.
//

#import "LXDScanCodeController.h"
#import "DismissTransition.h"

@interface DismissTransition()
@end

@implementation DismissTransition
// 返回动画的时间
- (NSTimeInterval)transitionDuration:(nullable id <UIViewControllerContextTransitioning>)transitionContext{
    return 0.5;
}
- (void)animateTransition:(id <UIViewControllerContextTransitioning>)transitionContext{
    LXDScanCodeController * fromVC = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
    UIViewController * toVC = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
    UIView * container = [transitionContext containerView];
    
    [container addSubview:toVC.view];
    
    
    // 动画
    [UIView animateKeyframesWithDuration:[self transitionDuration:transitionContext] delay:0 options:2 animations:^{
        toVC.view.layer.transform = CATransform3DIdentity;
    } completion:^(BOOL finished) {
        [fromVC removeFromParentViewController];
        [transitionContext completeTransition: ![transitionContext transitionWasCancelled]];
    }];
}

@end
