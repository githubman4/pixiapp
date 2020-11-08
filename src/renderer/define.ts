
/// /////////////////////////////////////////////////////////
export const MSG = {

  MSG1: 'MSG1',
  RE_MSG1: 'RE_MSG1',

  MSG_OPEN_PAGE2: 'MSG_OPEN_PAGE2',
  RE_MSG_OPEN_PAGE2: 'RE_MSG_OPEN_PAGE2',

  MSG_EXIT: 'MSG_EXIT',
  RE_MSG_EXIT: 'RE_MSG_EXIT'

}
/// /////////////////////////////////////////////////////////
export const KEYWORD = {
  KWD1: 'KWD1'
}
/// /////////////////////////////////////////////////////////
// electron メッセージで使用するインターフェイス
export interface IFelectronMessage {
    error: string | null; // エラー
    message: string | null; // メッセージ文字列
    anydata: any; // 添付データ
}
