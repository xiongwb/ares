/*
 * @providesModule AresAPI
 */

import Register      from '../api/register'
import Auth          from '../api/auth'
import Card          from '../api/bind_card'
import Phone         from '../api/change_phone'
import FindAcct      from '../api/find_acct'
import TranAcctSelf  from '../api/tran_acct_self'
import Settings      from '../api/settings'
import ResetLoginPwd from '../api/reset_login_pwd'
import ResetPayPwd   from '../api/reset_pay_pwd'
import Person        from '../api/person_info'
import QRCode        from '../api/qrcode'
import Bdmap         from '../api/bdmap'
import ShoppingCartController  from '../api/shopping_cart_controller'
import ProdCollectionController from '../api/prod_collection_controller'
import OrderController from '../api/order_controller'
import DestroyAcctController from '../api/destroy_acct_controller'
import PhoneVailidController from '../api/phone_vailid_controller'


export default {
  Register,
  Auth,
  Card,
  Phone,
  TranAcctSelf,
  FindAcct,
  Settings,
  ResetLoginPwd,
  ResetPayPwd,
  Person,
  QRCode,
  Bdmap,
  ShoppingCartController,
  ProdCollectionController,
  OrderController,
  DestroyAcctController,
  PhoneVailidController,
}
