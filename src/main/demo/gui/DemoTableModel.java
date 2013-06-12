package main.demo.gui;

import javax.swing.table.AbstractTableModel;

public class DemoTableModel extends AbstractTableModel
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