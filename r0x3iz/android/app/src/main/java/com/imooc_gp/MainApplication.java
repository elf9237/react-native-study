package com.imooc_gp;

import android.app.Application;
import android.util.Log;

import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.jph.u_share.UShareReactPackage;
import com.jph.u_share.util.Constants;
import com.microsoft.codepush.react.CodePush;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  {
    PlatformConfig.setWeixin(Constants.KEY_WEIXIN,Constants.SECRET_WEIXIN);
    PlatformConfig.setSinaWeibo(Constants.KEY_WEIBO, Constants.KEY_WEIBO);
    PlatformConfig.setQQZone(Constants.KEY_QQ, Constants.SECRET_QQ);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new UShareReactPackage(),
              new SplashScreenReactPackage(),
              new CodePush(BuildConfig.CODEPUSH_KEY, MainApplication.this, BuildConfig.DEBUG)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    UMShareAPI.get(this);
  }
}
