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
        if(col == 0) {
            return mapKeys.get(row);
        } else {
            return dataMap.get(mapKeys.get(row));
        }
    }

    /**
     * Handles removing a value
     * @param row
     */
    public void removeValueAt(int row)
    {
        System.out.println("removeValueAt: " + row);
        String key = mapKeys.remove(row);
        dataMap.remove(key);
        fireTableRowsDeleted(row, row);
    }

    /**
     * Handles updating the model if a value has been added. Includes checks to see if the key already exists.
     * @param key
     * @param value
     */
    public void updateValue(String key, String value)
    {
        System.out.println("updateValue: " + key + " => " + value);
        dataMap.put(key, value);

        // If it's a new key, add it to the list
        if(!mapKeys.contains(key)) {
            mapKeys.add(key);
            Collections.sort(mapKeys);
        }

        // Update the table
        fireTableDataChanged();
    }

    /**
     * Removes all values from the map
     */
    public void removeAll()
    {
        System.out.println("removeAll");
        mapKeys.clear();
        dataMap.clear();
        fireTableDataChanged();
    }
}