package com.myproject69.PIPModule;

import android.app.PictureInPictureParams;
import android.os.Build;
import android.util.Log;
import android.util.Rational;
import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

@ReactModule(name = "PIPModule")
public class PIPModule extends ReactContextBaseJavaModule {

    private static final String TAG = "PipModule";
    private boolean isModalActive = false;
    public PIPModule(@NonNull ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "PIPModule";
    }

    // Метод для включения флага
    @ReactMethod
    public void setModalActive(boolean isActive) {
        isModalActive = isActive;
        Log.d(TAG, "setModalActive called. Modal active: " + isActive);
    }

    public void enterPiPIfPossible() {
        Log.d(TAG, "Checking if PiP is possible. Modal active: " + isModalActive);
        if (isModalActive && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Log.d(TAG, "Entering Picture-in-Picture mode.");
            PictureInPictureParams.Builder pipBuilder = new PictureInPictureParams.Builder();
            Rational aspectRatio = new Rational(16, 9); // Установите пропорции
            pipBuilder.setAspectRatio(aspectRatio);

            if (getCurrentActivity() != null) {
                getCurrentActivity().enterPictureInPictureMode(pipBuilder.build());
            } else {
                Log.e(TAG, "Failed to enter PiP: Current activity is null.");
            }
        } else {
            Log.d(TAG, "PiP not entered. Either modal is not active or API level is below 26.");
        }
    }
}
