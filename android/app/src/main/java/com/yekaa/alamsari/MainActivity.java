package com.yekaa.alamsari;

import android.os.Bundle;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

  private WebView webView;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Get the WebView instance from the WebView plugin
    webView = getBridge().getWebView();

    //webView.setAlpha(0.9f);
  }
}
