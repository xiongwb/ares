const PHONE = /^1[3|4|5|7|8][0-9]{9}$/;
const ID_NO = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
const MONEY = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
const PWD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
const NUM = /^[0-9]*$/
export default {
  PHONE,
  ID_NO,
  MONEY,
  PWD,
  NUM,
}
