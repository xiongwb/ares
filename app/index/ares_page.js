/*
 * @providesModule AresPage
 */

import Check       from '../pages/check'
import Message     from '../pages/message'
import ErrorPage   from '../components/error_page'
import Login       from '../pages/login'
import SignUpStep1 from '../pages/sign_up_step_1'
import SignUpStep2 from '../pages/sign_up_step_2'
import SignUpStep3 from '../pages/sign_up_step_3'
import SignUpStep4 from '../pages/sign_up_step_4'
import SignUpStep5 from '../pages/sign_up_step_5'
import SignUpStep6 from '../pages/sign_up_step_6'
import Dashboard   from '../pages/dashboard'
import Setting     from '../pages/setting'

import PersonalNformation    from '../pages/personal_nformation'

import FingerPrint from '../pages/fingerprint'
import GestureLock from '../pages/gesturelock'

import PhoneChange     from '../pages/phone_change'
import PhoneChange1    from '../pages/phone_change1'
import PhoneChange2    from '../pages/phone_change2'
import ResetLoginPwd1  from '../pages/reset_login_pwd_1'
import ResetLoginPwd2  from '../pages/reset_login_pwd_2'
import ResetLoginPwd3  from '../pages/reset_login_pwd_3'

import ResetPayPwd1 from '../pages/reset_pay_pwd_1'
import ResetPayPwd2 from '../pages/reset_pay_pwd_2'
import ResetPayPwd3 from '../pages/reset_pay_pwd_3'

import Bill from '../pages/bill'

import BankCard  from '../pages/bank_card'
import BankCard1 from '../pages/bank_card1'
import BankCard2 from '../pages/bank_card2'
import BankCard3 from '../pages/bank_card3'
import BankCard4 from '../pages/bank_card4'
import BankCard5 from '../pages/bank_card5'

import PersonalNformation1 from '../pages/personal_nformation1'

import Type2Account     from '../pages/type2_account'
import Type2Account1    from '../pages/type2_account1'
import Type2Account2    from '../pages/type2_account2'
import Type2Recharge    from '../pages/type2_recharge'
import Type2Withdrawals from '../pages/type2_withdrawals'

import Type3Account  from '../pages/type3_account'
import Type3Account1 from '../pages/type3_account1'
import Type3Account2 from '../pages/type3_account2'
import Type3Account3 from '../pages/type3_account3'
import Type3Recharge from '../pages/type3_recharge'

import Type3Withdrawals from '../pages/type3_withdrawals'
import TransferAccounts from '../pages/transfer_accounts'

import ForgetPwd1 from '../pages/forget_pwd_1'
import ForgetPwd2 from '../pages/forget_pwd_2'
import ForgetPwd3 from '../pages/forget_pwd_3'
import ForgetPwd4 from '../pages/forget_pwd_4'

import AidKit      from '../pages/aid_kit'
import ReportLoss1 from '../pages/report_loss_1'
import ReportLoss2 from '../pages/report_loss_2'
import ReportLossMsg from '../pages/report_loss_msg'
import ReportLossSuccess from '../pages/report_loss_success'
import CollectionAndPayment from '../pages/collection_and_payment'
import CollectionCode from '../pages/collection_code'
import PaymentCode from '../pages/payment_code'
import SmartService from '../pages/smart_service'
import Asset from '../pages/asset'
import TestBackNavBar from '../pages/test_back_nav_bar'
import TestDialog      from '../pages/test_dialog'

import MyExpress      from '../pages/my_express'
import TurnOutSuccess  from '../pages/turn_out_success'
import TurnToSuccess   from '../pages/turn_to_success'
import TransferSuccess   from '../pages/transfer_success'
import FluxRecharge from '../pages/flux_recharge'
import BlueCard from '../pages/blue_card'
import QRCodeScan from '../pages/qrcode_scan'
import SceneConfig from '../constants/scene_config'
import MyOrder from '../pages/my_order'
import MoreBusiness from '../pages/more_business'
import SelectCity from '../pages/select_city'
import SetMoneyCollection from '../pages/set_money_collection'
import SetMoneyPayment from '../pages/set_money_payment'
import TelephoneRecharge from '../pages/telephone_recharge'
import ExchangeRateConversion from '../pages/exchange_rate_conversion'
import SelectCountry from '../pages/select_country'
import RechargeSuccess from '../pages/recharge_success'
import WithdrawalsSuccess from '../pages/withdrawals_success'
import ScanFinish from '../pages/scan_finish'
import PaymentSuccess from '../pages/payment_success'
import TwoTransfer from '../pages/two_transfer'
import CompanyProfile from '../pages/company_profile'

import CommodityDetail from '../pages/commodity_detail'
import PurchaseGoods from '../pages/purchase_goods'
import HomePage from '../pages/homepage'
import Location from '../pages/location'
import Loading from '../pages/loading'

import FoodList from '../pages/food_list'
import AresMap from '../pages/ares_map'
import PaymentOrder from '../pages/payment_order'
import PackageDetail from '../pages/package_detail'
import FoodSearch from '../pages/food_search'
import B2cMall from '../pages/b2cMall'
import MyCollection from '../pages/my_collection'
import OrderDetails from '../pages/order_details'

import Type2 from '../pages/type2'
import Type3 from '../pages/type3'
import B2CGoodsDetails from '../pages/b2c_goodsdetails'
import ShoppingSuccess from '../pages/shopping_success'
import ShopCart from '../pages/shopping_cart'
import GoodsArgument from '../pages/goods_argument'

import ManagementAddress from '../pages/management_address'
import NewAddress from '../pages/new_address'
import ReceivingAddress from '../pages/receiving_address'
import FillOrder from '../pages/fill_order'
import RefundProcess from '../pages/refund_process'
import RefundSchedule from '../pages/refund_schedule'


import Logistics from '../pages/logistics'
import Evaluate from '../pages/evaluate'
import AllEvaluation from '../pages/all_evaluation'
import Invoice from '../pages/invoice'

import WaterCostOrg from '../pages/water_cost_org'
import WaterCost from '../pages/water_cost'
import WaterConfirm from '../pages/water_confirm'
import WaterFamily from '../pages/water_family'
import ElectricityCostOrg from '../pages/electricity_cost_org'
import ElectricityCost from '../pages/electricity_cost'
import ElectricityConfirm from '../pages/electricity_confirm'
import ElectricityFamily from '../pages/electricity_family'
import GasCostOrg from '../pages/gas_cost_org'
import GasCost from '../pages/gas_cost'
import GasConfirm from '../pages/gas_confirm'
import GasFamily from '../pages/gas_family'
import CATVCostOrg from '../pages/catv_cost_org'
import CATVCost from '../pages/catv_cost'
import CATVConfirm from '../pages/catv_confirm'
import CATVFamily from '../pages/catv_family'
import TelephoneCostOrg from '../pages/telephone_cost_org'
import TelephoneCost from '../pages/telephone_cost'
import TelephoneConfirm from '../pages/telephone_confirm'
import TelephoneFamily from '../pages/telephone_family'
import PropertyCostOrg from '../pages/property_cost_org'
import PropertyCost from '../pages/property_cost'
import PropertyConfirm from '../pages/property_confirm'
import PropertyFamily from '../pages/property_family'
import HeatingCostOrg from '../pages/heating_cost_org'
import HeatingCost from '../pages/heating_cost'
import HeatingConfirm from '../pages/heating_confirm'
import HeatingFamily from '../pages/heating_family'
import NewLocation from '../pages/new_location'
import MyEarnings from '../pages/my_earnings'
import MyCoupon from '../pages/my_coupon'
import Transfer from '../pages/transfer'
import MyIntegral from '../pages/my_integral'
import ConfirmTransfer from '../pages/confirm_transfer'
import PayTheFees from '../pages/pay_the_fees'
import LiuLuYe from '../pages/liuluye'

import ExpressCheck from '../pages/express_check'
import Recruitment from '../pages/recruitment'
import ExpressDelivery from '../pages/express_delivery'
import ExpressInfo from '../pages/express_info'
import TakeSuccess from '../pages/take_success'
import PaymentExpressQuery from '../pages/payment_express_query'
import DeliveryFailure from '../pages/delivery_failure'
import Success from '../pages/success'

export default {

  Check,
  Message,
  ErrorPage,
  Login,
  SignUpStep1,
  SignUpStep2,
  SignUpStep3,
  SignUpStep4,
  SignUpStep5,
  SignUpStep6,
  Dashboard,
  Setting,
  PersonalNformation,
  FingerPrint,
  GestureLock,
  PhoneChange,
  PhoneChange1,
  PhoneChange2,
  ResetLoginPwd1,
  ResetLoginPwd2,
  ResetLoginPwd3,
  ResetPayPwd1,
  ResetPayPwd2,
  ResetPayPwd3,
  Bill,
  BankCard,
  BankCard1,
  BankCard2,
  BankCard3,
  BankCard4,
  BankCard5,
  PersonalNformation1,
  Type2Account,
  Type2Account1,
  Type2Account2,
  Type2Recharge,
  Type2Withdrawals,
  Type3Account,
  Type3Account1,
  Type3Account2,
  Type3Account3,
  Type3Recharge,
  Type3Withdrawals,
  TransferAccounts,
  ForgetPwd1,
  ForgetPwd2,
  ForgetPwd3,
  ForgetPwd4,
  AidKit,
  ReportLoss1,
  ReportLoss2,
  ReportLossMsg,
  ReportLossSuccess,
  CollectionAndPayment,
  CollectionCode,
  PaymentCode,
  SmartService,
  Asset,
  TestBackNavBar,
  TestDialog,
  MyExpress,
  TurnOutSuccess,
  TurnToSuccess,
  TransferSuccess,
  FluxRecharge,
  BlueCard,
  QRCodeScan,
  SceneConfig,
  MyOrder,
  MoreBusiness,
  SelectCity,
  SetMoneyCollection,
  SetMoneyPayment,
  TelephoneRecharge,
  ExchangeRateConversion,
  SelectCountry,
  RechargeSuccess,
  WithdrawalsSuccess,
  ScanFinish,
  PaymentSuccess,
  TwoTransfer,
  CompanyProfile,
  AresMap,
  CommodityDetail,
  PurchaseGoods,
  HomePage,
  Location,
  Loading,
  FoodList,
  PaymentOrder,
  PackageDetail,
  FoodSearch,
  B2cMall,
  MyCollection,
  Type2,
  Type3,
  B2CGoodsDetails,
  ShoppingSuccess,
  ShopCart,
  GoodsArgument,
  OrderDetails,
  ManagementAddress,
  NewAddress,
  FillOrder,
  ReceivingAddress,

  RefundProcess,
  RefundSchedule,

  Logistics,
  Evaluate,
  AllEvaluation,
  Invoice,
  WaterCostOrg,
  WaterCost,
  WaterConfirm,
  WaterFamily,
  ElectricityCostOrg,
  ElectricityCost,
  ElectricityConfirm,
  ElectricityFamily,
  GasCostOrg,
  GasCost,
  GasConfirm,
  GasFamily,
  CATVCostOrg,
  CATVCost,
  CATVConfirm,
  CATVFamily,
  TelephoneCostOrg,
  TelephoneCost,
  TelephoneConfirm,
  TelephoneFamily,
  PropertyCostOrg,
  PropertyCost,
  PropertyConfirm,
  PropertyFamily,
  HeatingCostOrg,
  HeatingCost,
  HeatingConfirm,
  HeatingFamily,
  NewLocation,
  MyEarnings,
  MyCoupon,
  Transfer,
  MyIntegral,
  ConfirmTransfer,
  PayTheFees,

  LiuLuYe,

  DeliveryFailure,
  ExpressCheck,
  Recruitment,
  ExpressDelivery,
  ExpressInfo,
  TakeSuccess,
  PaymentExpressQuery,

  Success,

}
