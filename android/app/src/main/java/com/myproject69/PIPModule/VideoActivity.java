package com.myproject69.PIPModule;

import android.app.PictureInPictureParams;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.util.Rational;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.ReactRootView;

import com.myproject69.MainApplication;

public class VideoActivity extends AppCompatActivity {
    private static final String TAG = "VideoActivity";
    private ReactRootView mReactRootView; 
    public static VideoActivity currentInstance; // Ссылка на текущий экземпляр активности

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        currentInstance = this; // Устанавливаем текущую активность
        mReactRootView = new ReactRootView(this);
        mReactRootView.startReactApplication(
                ((MainApplication) getApplication()).getReactNativeHost().getReactInstanceManager(),
                "VideoScreen",
                null
        );
        setContentView(mReactRootView);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        currentInstance = null; // Очищаем ссылку на активность
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "VideoActivity is resumed");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "VideoActivity is paused");
    }

    @Override
    protected void onUserLeaveHint() {
        super.onUserLeaveHint();
        Log.d(TAG, "User is leaving the app, trying to enter PIP");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            try {
                // Создаём параметры для PIP
                PictureInPictureParams.Builder pipBuilder = new PictureInPictureParams.Builder();

                // Устанавливаем соотношение сторон (16:9 для видео)
                pipBuilder.setAspectRatio(new Rational(16, 9));

                // Входим в режим PIP
                boolean result = enterPictureInPictureMode(pipBuilder.build());

                if (result) {
                    Log.d(TAG, "Successfully entered PIP mode");
                } else {
                    Log.e(TAG, "Failed to enter PIP mode");
                }
            } catch (IllegalStateException e) {
                Log.e(TAG, "Failed to enter PIP: " + e.getMessage());
            }
        }
    }

    public void enterPIPModeDirectly() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            try {
                PictureInPictureParams.Builder pipBuilder = new PictureInPictureParams.Builder();
                pipBuilder.setAspectRatio(new Rational(16, 9)); // Пропорции 16:9
                enterPictureInPictureMode(pipBuilder.build());
                Log.d("VideoActivity", "Successfully entered PIP mode");
            } catch (IllegalStateException e) {
                Log.e("VideoActivity", "Failed to enter PIP: " + e.getMessage());
            }
        } else {
            Log.e("VideoActivity", "API ниже 26, PIP не поддерживается.");
        }
    }
}