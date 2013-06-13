package main.demo.gui;

import javax.swing.*;

/**
 * Demo application for the Realtime Gx library. Showcases the use of a collaborative map.
 */
public class DemoGuiApp
{

    public static void main(String[] args)
    {
        // Initialize Gx before starting the app

        DemoGuiApp app = new DemoGuiApp();
        app.start();
    }

    public void start()
    {
        SwingUtilities.invokeLater(() -> RealtimePanel.createUI(null));
    }

}
