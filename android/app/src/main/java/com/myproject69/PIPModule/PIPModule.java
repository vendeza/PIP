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

public class PIPModule extends ReactContextBaseJavaModule {
    public PIPModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "PIPModule";
    }

    @ReactMethod
    public void startVideoActivity() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, VideoActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    @ReactMethod
    public void startPIPMode() {
        final Activity currentActivity = getCurrentActivity();

        if (currentActivity != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            currentActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    try {
                        new Handler().postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                if (currentActivity.hasWindowFocus()) { // Проверяем фокус активности
                                    PictureInPictureParams.Builder pipBuilder = new PictureInPictureParams.Builder();
                                    pipBuilder.setAspectRatio(new Rational(16, 9)); // Пропорции 16:9
                                    currentActivity.enterPictureInPictureMode(pipBuilder.build());
                                } else {
                                    Log.e("PIPModule", "Activity does not have window focus. Retrying...");
                                    // Попробуем снова через 500ms
                                    new Handler().postDelayed(this, 500);
                                }
                            }
                        }, 300);
                    } catch (IllegalStateException e) {
                        Log.e("PIPModule", "Failed to enter PIP: " + e.getMessage());
                    }
                }
            });
        } else {
            Log.e("PIPModule", "Current activity is null or API level is below 26");
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