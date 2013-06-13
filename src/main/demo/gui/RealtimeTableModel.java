package main.demo.gui;

import gx.realtime.CollaborativeMap;

import javax.swing.table.AbstractTableModel;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

public class RealtimeTableModel extends AbstractTableModel
{
    private final CollaborativeMap<String> collaborativeMap;
    private final HashMap<String, String> dataMap;
    private String[] columnNames = {"Key", "Value"};
    private List<String> mapKeys;

    public RealtimeTableModel(CollaborativeMap<String> collaborativeMap)
    {
        this.collaborativeMap = collaborativeMap;

        dataMap = new HashMap<>();
        dataMap.put("key1", "value1");
        dataMap.put("key2", "value2");
        dataMap.put("key3", "value3");
        dataMap.put("key4", "value4");

        mapKeys = new ArrayList<>(dataMap.keySet());
        Collections.sort(mapKeys);
    }

    public int getColumnCount()
    {
        return columnNames.length;
    }

    public int getRowCount()
    {
        return mapKeys.size();
    }

    public String getColumnName(int col)
    {
        return columnNames[col];
    }

    public Object getValueAt(int row, int col)
    {
        return dataMap.get(mapKeys.get(row));
    }

    public boolean isCellEditable(int row, int col)
    {
        // Only allow users to edit the value, not the key
        return col > 0;
    }

    @Override
    public void setValueAt(Object value, int row, int col)
    {
        System.out.println("Settings " + getValueAt(row, 0) + " to " + value);

//        collaborativeMap.set(mapKeys.get(row), (String)value);
        dataMap.put(mapKeys.get(row), (String) value);
        fireTableCellUpdated(row, col);
    }

    /**
     * Handles removing a value
     * @param row
     */
    public void removeValueAt(int row)
    {
        String key = mapKeys.remove(row);
        dataMap.remove(key);
        fireTableRowsDeleted(row, row);
    }

    /**
     * Handles updating the model if a value has been added. Includes checks to see if the key already exists.
     * @param key
     * @param value
     */
    public void addValue(String key, String value)
    {
        dataMap.put(key, value);
        if(mapKeys.contains(key)) {
            fireTableCellUpdated(mapKeys.indexOf(key), 1);
        } else {
            mapKeys.add(key);
            Collections.sort(mapKeys);
            fireTableRowsInserted(mapKeys.indexOf(key), mapKeys.indexOf(key));
        }
    }
}