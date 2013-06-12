package main.demo.gui;

import javax.swing.*;
import java.awt.*;

/**
 * Demo application for the Realtime Gx library. Showcases the use of a collaborative map.
 */
public class DemoGuiApp
{
    public DemoGuiApp()
    {
        // Initialize Gx

    }

    public static void main(String[] args)
    {
        DemoGuiApp app = new DemoGuiApp();
        app.start();
    }

    public void start()
    {
        SwingUtilities.invokeLater(() -> DemoGuiPanel.createUI());
    }

}

//class DemoGuiPanel extends JPanel
//{
//
//    public DemoGuiPanel()
//    {
//        super(new GridLayout(4, 2, 5, 5));
//        initializeGui();
//    }
//
//    public static void createUI()
//    {
//        JFrame frame = new JFrame("Demo Realtime Gx Application");
//
//        DemoGuiPanel newContentPane = new DemoGuiPanel();
//        newContentPane.setOpaque(true);
//        frame.setContentPane(newContentPane);
//
//        frame.pack();
//        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//        frame.setVisible(true);
//    }
//
//    private void initializeGui()
//    {
//        JTable table = new JTable(new DemoTableModel.MyTableModel());
//        table.setPreferredScrollableViewportSize(new Dimension(500, 200));
//        table.setFillsViewportHeight(true);
//
//        //Create the scroll pane and add the table to it.
//        JScrollPane scrollPane = new JScrollPane(table);
//
//        //Add the scroll pane to this panel.
//        add(scrollPane);
//    }
//
//    private void initializeGx()
//    {
//        // TODO: set up the Realtime component
//    }
//
//}
