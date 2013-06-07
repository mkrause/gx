package main;

import javax.swing.*;
import javax.swing.table.AbstractTableModel;
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
        startUI();
    }

    private void startUI()
    {
        // Start the GUI in a separate thread
        SwingUtilities.invokeLater(new Runnable()
        {
            public void run()
            {
                DemoGuiPanel.createUI();
            }
        });
    }

}

class DemoGuiPanel extends JPanel
{

    public DemoGuiPanel()
    {
        super(new GridLayout(1, 0));
        initializeGui();
    }

    public static void createUI()
    {
        JFrame frame = new JFrame("Demo Realtime Gx Application");

        DemoGuiPanel newContentPane = new DemoGuiPanel();
        newContentPane.setOpaque(true);
        frame.setContentPane(newContentPane);

        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }

    private void initializeGui()
    {
        JTable table = new JTable(new MyTableModel());
        table.setPreferredScrollableViewportSize(new Dimension(500, 200));
        table.setFillsViewportHeight(true);

        //Create the scroll pane and add the table to it.
        JScrollPane scrollPane = new JScrollPane(table);

        //Add the scroll pane to this panel.
        add(scrollPane);
    }

    private void initializeGx()
    {
        // TODO: set up the Realtime component
    }

    class MyTableModel extends AbstractTableModel
    {
        private String[] columnNames = {"Key", "Value"};
        private Object[][] data = {
                {"key", "value"},
                {"key2", "value2"},
                {"key3", "value3"},
        };

        public int getColumnCount()
        {
            return columnNames.length;
        }

        public int getRowCount()
        {
            // TODO: call map.size()
            return data.length;
        }

        public String getColumnName(int col)
        {
            return columnNames[col];
        }

        public Object getValueAt(int row, int col)
        {
            // TODO: get value from Gx
            return data[row][col];
        }

        public boolean isCellEditable(int row, int col)
        {
            return col > 0;
        }

        public void setValueAt(Object value, int row, int col)
        {
            System.out.println("Settings " + getValueAt(row, 0) + " to " + value);

            // TODO: propagate change through Gx
            data[row][col] = value;
            fireTableCellUpdated(row, col);
        }

    }
}
