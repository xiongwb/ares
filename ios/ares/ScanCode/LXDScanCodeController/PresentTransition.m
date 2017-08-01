//
//  CustomViewControllerTransition.m
//  转场动画
//
//  Created by 霍文轩 on 15/10/30.
//  Copyright © 2015年 霍文轩. All rights reserved.
//

#import "PresentTransition.h"
#import "LXDScanCodeController.h"

@interface PresentTransition()
@end

@implementation PresentTransition
// 返回动画的时间
- (NSTimeInterval)transitionDuration:(nullable id <UIViewControllerContextTransitioning>)transitionContext{
    return 0.5;
}
- (void)animateTransition:(id <UIViewControllerContextTransitioning>)transitionContext{
    UIViewController * fromVC = [transitionContext viewControllerForKey:UITransitionContextFromViewControllerKey];
    LXDScanCodeController * toVC = [transitionContext viewControllerForKey:UITransitionContextToViewControllerKey];
    UIView * container = [transitionContext containerView];
    
    [container addSubview:toVC.view];
    [container bringSubviewToFront:fromVC.view];
    
    // 动画
    [UIView animateKeyframesWithDuration:[self transitionDuration:transitionContext] delay:0 options:2 animations:^{
        fromVC.view.layer.affineTransform = CGAffineTransformMakeTranslation(-toVC.view.frame.size.width,0);
    } completion:^(BOOL finished) {
        [transitionContext completeTransition:YES];
    }];
}

@end
