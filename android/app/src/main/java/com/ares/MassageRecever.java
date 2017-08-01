package com.ares;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.telephony.SmsMessage;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class MassageRecever extends BroadcastReceiver {
    private static final String ACTION = "android.provider.Telephony.SMS_RECEIVED";
    public static MessageListener messageListener;
    public static String phone;


    @Override
    public void onReceive(Context context, Intent intent) {
        Bundle bundle = intent.getExtras();
        Object[] pdus = (Object[]) bundle.get("pdus");
        SmsMessage[] messages = new SmsMessage[pdus.length];
        for(int i=0; i<messages.length;i++){
            messages[i] = SmsMessage.createFromPdu((byte[])pdus[i]);
        }
        String address = messages[0].getOriginatingAddress();
        String fullMessage = "";
        for(SmsMessage message : messages){
            fullMessage += message.getDisplayMessageBody();
        }
        String regEx="[^0-9]";
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(fullMessage);
        String mess = m.replaceAll("").trim();
        if(phone.equals(address)){
            messageListener.onReceived(mess);
            abortBroadcast();
        }

    }

    public interface MessageListener{
        public void onReceived(String message);
    }


    
    public void setOnReceviedMessageListener(Context context,String phone,MessageListener mMessageListener){
        this.messageListener = mMessageListener;
        this.phone = phone;
        MassageRecever massageRecever = new MassageRecever();
        IntentFilter filter = new IntentFilter(ACTION);
        filter.setPriority(Integer.MAX_VALUE);
        context.registerReceiver(massageRecever,filter);

    }
}
