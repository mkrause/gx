package main.demo.gui;

import gx.realtime.CollaborativeMap;

import javax.swing.table.AbstractTableModel;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class RealtimeTableModel extends AbstractTableModel
{
    private final CollaborativeMap collaborativeMap;
    private String[] columnNames = {"Key", "Value"};
    private List<String> mapKeys;

    public RealtimeTableModel(CollaborativeMap collaborativeMap)
    {
        this.collaborativeMap = collaborativeMap;

        mapKeys = new ArrayList<>(collaborativeMap.keys());
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
        if (col == 0) {
            return mapKeys.get(row);
        } else {
            return collaborativeMap.get(mapKeys.get(row));
        }
    }

    /**
     * Handles removing a value
     *
     * @param row
     */
    public void removeValueAt(int row)
    {
        String key = mapKeys.remove(row);
        System.out.println("removeValueAt: " + row + ", key: " + key);
        collaborativeMap.delete(key);
        fireTableRowsDeleted(row, row);
    }

    /**
     * Handles updating the model if a value has been added. Includes checks to see if the key already exists.
     *
     * @param key
     * @param value
     */
    public void updateValue(String key, String value)
    {
        System.out.println("updateValue: " + key + " => " + value);
        collaborativeMap.set(key, value);

        // If it's a new key, add it to the list
        if (!mapKeys.contains(key)) {
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
        collaborativeMap.clear();
        fireTableDataChanged();
    }

    /**
     * Helper method to remove a value from the system based on external events.
     *
     * @param property
     */
    public void removeValue(String property)
    {
        removeValueAt(mapKeys.indexOf(property));
    }
}