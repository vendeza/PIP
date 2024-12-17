package com.myproject69.PIPModule;

import android.app.Activity;
import android.app.PictureInPictureParams;
import android.content.Intent;
import android.os.Build;
import android.os.Handler;
import android.util.Log;
import android.util.Rational;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

public class PIPModule extends ReactContextBaseJavaModule {
    public PIPModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PIPModule";
    }

    @ReactMethod
    public void startVideoActivity(ReadableMap params) {
        try {
            ReactApplicationContext context = getReactApplicationContext();
            Intent intent = new Intent(context, VideoActivity.class);

            // Передаем параметры из ReadableMap в Intent
            if (params.hasKey("consultationId")) {
                intent.putExtra("consultationId", params.getString("consultationId"));
            }
            if (params.hasKey("to")) {
                intent.putExtra("to", params.getString("to"));
            }
            if (params.hasKey("username")) {
                intent.putExtra("username", params.getString("username"));
            }

            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.startActivity(intent);
            Log.d("PIPModule", "Started VideoActivity with params: " + params);
        } catch (Exception e) {
            Log.e("PIPModule", "Failed to start VideoActivity: " + e.getMessage());
        }
    }


    @ReactMethod
    public void enterPIPModeDirectly() {
        VideoActivity currentActivity = VideoActivity.currentInstance; // Используем текущую активность напрямую

        if (currentActivity != null) {
            try {
                currentActivity.enterPIPModeDirectly();
                Log.d("PIPModule", "Successfully called enterPIPModeDirectly");
            } catch (Exception e) {
                Log.e("PIPModule", "Failed to call enterPIPModeDirectly: " + e.getMessage());
            }
        } else {
            Log.e("PIPModule", "Current activity is null или это не VideoActivity");
        }
    }

}