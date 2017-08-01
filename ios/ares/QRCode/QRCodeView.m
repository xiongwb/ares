//
//  QRCodeVIew.m
//  ares
//
//  Created by Tinklin on 2016/10/28.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "QRCodeView.h"
@interface QRCodeView ()
@property (strong, nonatomic) NSString *code;
@property (assign, nonatomic) CGFloat  currentBrightness;

@property (strong, nonatomic)          UILabel        *adContentLabel;
@property (strong, nonatomic)          NSTimer        *scrollTimer;

@property (retain, nonatomic)            UIView         *rectView;
@property (retain, nonatomic)            UIImageView    *barCodeImageView;
@property (retain, nonatomic)            UIImageView    *qrCodeImageView;
@property (retain, nonatomic)            UILabel        *barCodeLabel;

@property (strong, nonatomic)          UIView         *barCodeContentView;
@property (strong, nonatomic)          UIView         *qrCodeContentView;
@property (strong, nonatomic)          UIImageView    *barCodeSizeImageView;
@property (strong, nonatomic)          UIImageView    *qrCodeSizeImageView;
@property (strong, nonatomic)          UILabel        *barCodeSizeLabel;

@property (strong, nonatomic)          NSTimer        *progressTimer;

@property (strong, nonatomic)          NSDictionary   *jsonDict;
@end


@implementation QRCodeView

- (instancetype) initWithFrame:(CGRect)frame{
  if ((self = [super initWithFrame:frame])) {

  }
  return self;
}

- (void)setMessage:(NSString *)message {
  _message = message;
  self.code = _message;
  [self createView];
}

- (void)createView {
  
  CGFloat screenWidth = [UIScreen mainScreen].bounds.size.width;
  CGFloat edge = 8;
  CGFloat rectViewWidth = screenWidth - 2 * edge;
  self.rectView = [[UIView alloc]initWithFrame:CGRectMake(edge, 20, rectViewWidth, rectViewWidth)];
  self.rectView.backgroundColor = [UIColor whiteColor];
  [self.rectView.layer setCornerRadius:5.0f];
  [self addSubview:self.rectView];
  
  self.barCodeImageView = [[UIImageView alloc]initWithFrame:CGRectMake(edge, edge, rectViewWidth - 2 * edge, (rectViewWidth - 2 * edge) * 25/92)];
  self.barCodeImageView.layer.shadowOffset = CGSizeMake(0, 0);  // 设置阴影的偏移量
  self.barCodeImageView.layer.shadowRadius = 0; // 设置阴影的半径
  self.barCodeImageView.layer.shadowColor = [UIColor blackColor].CGColor; // 设置阴影的颜色为黑色
  self.barCodeImageView.layer.shadowOpacity = 0; // 设置阴影的不透明度
  [self.rectView addSubview:self.barCodeImageView];
  
  self.barCodeLabel = [[UILabel alloc]initWithFrame:CGRectMake(edge, CGRectGetMaxY(self.barCodeImageView.frame), rectViewWidth, 18)];
  self.barCodeLabel.textColor = [UIColor blackColor];
  self.barCodeLabel.textAlignment = NSTextAlignmentCenter;
  self.barCodeLabel.font = [UIFont systemFontOfSize:15];
  [self.rectView addSubview:self.barCodeLabel];
  
  CGFloat qrHeight = rectViewWidth - CGRectGetMaxY(self.barCodeLabel.frame) - 2 * edge;
  
  self.qrCodeImageView = [[UIImageView alloc]initWithFrame:CGRectMake((self.rectView.frame.size.width - qrHeight)/2, CGRectGetMaxY(self.barCodeLabel.frame) + edge, qrHeight, qrHeight)];
  self.qrCodeImageView.layer.shadowOffset = CGSizeMake(0, 0);  // 设置阴影的偏移量
  self.qrCodeImageView.layer.shadowRadius = 0; // 设置阴影的半径
  self.qrCodeImageView.layer.shadowColor = [UIColor blackColor].CGColor; // 设置阴影的颜色为黑色
  self.qrCodeImageView.layer.shadowOpacity = 0; // 设置阴影的不透明度
  
  [self.rectView addSubview:self.qrCodeImageView];
  
  _qrCodeContentView = [[UIView alloc] init];
  _qrCodeImageView.userInteractionEnabled = YES;
  _barCodeContentView = [[UIView alloc] init];
  _barCodeImageView.userInteractionEnabled = YES;
  
  [self loadDataFromService];

}
- (void)tapQRCodeBigger
{
}

- (void)tapQRCodeSmaller
{
}

- (void)tapBarCodeBigger
{
}

- (void)tapBarCodeSmaller
{
}


#pragma mark - 加载条形码以及二维码
- (void)reloadQRCodeAndBarCode {
  [_progressTimer invalidate];
  [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:YES];
  [self loadDataFromService];
}

- (void)loadDataFromService {
  // 输出获取到的数据
  self.barCodeLabel.text = self.code;
  
  
  // 生成条形码
  
  self.barCodeImageView.image = [self generateBarCode:self.code width:self.barCodeImageView.frame.size.width height:self.barCodeImageView.frame.size.height];
  if (self.barCodeContentView.frame.size.width != 0 && self.barCodeContentView.frame.size.height != 0) {
    NSLog(@"重新加载条形码");
    self.barCodeSizeImageView.image = [UIImage imageWithCIImage:[self.barCodeImageView.image CIImage] scale:1.0 orientation:UIImageOrientationRight];
    self.barCodeSizeLabel.text = self.code;
  }
  
  // 生成二维码
  self.qrCodeImageView.image = [self generateQRCode:self.code width:self.qrCodeImageView.frame.size.width height:self.qrCodeImageView.frame.size.height];
  if (self.qrCodeContentView.frame.size.width != 0 && self.qrCodeContentView.frame.size.height != 0) {
    NSLog(@"重新加载二维码");
    self.qrCodeSizeImageView.image = [UIImage imageWithCIImage:[self.qrCodeImageView.image CIImage]];
  }
  
  // 添加放大事件
  [self.qrCodeImageView addGestureRecognizer:[[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tapQRCodeBigger)]];
  [self.barCodeImageView addGestureRecognizer:[[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(tapBarCodeBigger)]];
  
  [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:NO];
  
}
#pragma mark - 生成条形码以及二维码

// 参考文档
// https://developer.apple.com/library/mac/documentation/GraphicsImaging/Reference/CoreImageFilterReference/index.html

- (UIImage *)generateQRCode:(NSString *)code width:(CGFloat)width height:(CGFloat)height {
  
  // 生成二维码图片
  CIImage *qrcodeImage;
  NSData *data = [_code dataUsingEncoding:NSISOLatin1StringEncoding allowLossyConversion:false];
  CIFilter *filter = [CIFilter filterWithName:@"CIQRCodeGenerator"];
  [filter setDefaults];
  [filter setValue:data forKey:@"inputMessage"];
  [filter setValue:@"H" forKey:@"inputCorrectionLevel"];
  qrcodeImage = [filter outputImage];
  ;
  return [self createNonInterpolatedUIImageFormCIImage:qrcodeImage withSize:width];
}
- (UIImage *)createNonInterpolatedUIImageFormCIImage:(CIImage *)image withSize:(CGFloat) size
{
  CGRect extent = CGRectIntegral(image.extent);
  CGFloat scale = MIN(size/CGRectGetWidth(extent), size/CGRectGetHeight(extent));
  
  // 1.创建bitmap;
  size_t width = CGRectGetWidth(extent) * scale;
  size_t height = CGRectGetHeight(extent) * scale;
  CGColorSpaceRef cs = CGColorSpaceCreateDeviceGray();
  CGContextRef bitmapRef = CGBitmapContextCreate(nil, width, height, 8, 0, cs, (CGBitmapInfo)kCGImageAlphaNone);
  CIContext *context = [CIContext contextWithOptions:nil];
  CGImageRef bitmapImage = [context createCGImage:image fromRect:extent];
  CGContextSetInterpolationQuality(bitmapRef, kCGInterpolationNone);
  CGContextScaleCTM(bitmapRef, scale, scale);
  CGContextDrawImage(bitmapRef, extent, bitmapImage);
  
  // 2.保存bitmap到图片
  CGImageRef scaledImage = CGBitmapContextCreateImage(bitmapRef);
  CGContextRelease(bitmapRef);
  CGImageRelease(bitmapImage);
  return [UIImage imageWithCGImage:scaledImage];
}


- (UIImage *)generateBarCode:(NSString *)code width:(CGFloat)width height:(CGFloat)height {
  // 生成条形码图片
  CIImage *barcodeImage;
  NSData *data = [_code dataUsingEncoding:NSISOLatin1StringEncoding allowLossyConversion:false];
  CIFilter *filter = [CIFilter filterWithName:@"CICode128BarcodeGenerator"];
  
  [filter setValue:data forKey:@"inputMessage"];
  barcodeImage = [filter outputImage];
  
  return [self createNonInterpolatedUIImageFormCIImage:barcodeImage withSize:width];
}

/*
// Only override drawRect: if you perform custom drawing.
// An empty implementation adversely affects performance during animation.
- (void)drawRect:(CGRect)rect {
    // Drawing code
}
*/

@end
