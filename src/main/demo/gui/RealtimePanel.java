/*
 * Created by JFormDesigner on Wed Jun 12 20:23:52 CEST 2013
 */

package main.demo.gui;

import gx.realtime.CollaborativeMap;
import gx.realtime.Event;
import gx.realtime.EventHandler;
import gx.realtime.EventType;

import javax.swing.*;
import javax.swing.GroupLayout;
import javax.swing.LayoutStyle;

/**
 * @author Real Time
 */
public class RealtimePanel extends JPanel {
    private RealtimeTableModel model;

    public RealtimePanel(CollaborativeMap<String> collabMap) {
        model = new RealtimeTableModel(collabMap);


//        EventHandler handler = (event) -> {
//            System.out.println("**** Received event of type: " + event.getType());
//        };
//        collabMap.addEventListener(EventType.COLLABORATOR_JOINED, handler);
//        collabMap.addEventListener(EventType.COLLABORATOR_LEFT, handler);
//        collabMap.addEventListener(EventType.OBJECT_ADDED, handler);
//        collabMap.addEventListener(EventType.VALUE_CHANGED, handler);
        initComponents();
    }

    public static void createUI(CollaborativeMap<String> collabMap)
    {
        JFrame frame = new JFrame("Demo Realtime Gx Application");

        RealtimePanel newContentPane = new RealtimePanel(collabMap);
        newContentPane.setOpaque(true);
        frame.setContentPane(newContentPane);

        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
    }

    private void initComponents() {
        tableScrollPane = new JScrollPane();
        table = new JTable(model);
        clearButton = new JButton();
        removeButton = new JButton();
        putButton = new JButton();
        keyField = new JTextField();
        valueField = new JTextField();
        keyLabel = new JLabel();
        valueLabel = new JLabel();
        separator = new JSeparator();
        eventLogScrollPane = new JScrollPane();
        eventLogArea = new JTextArea();
        eventLogLabel = new JLabel();

        //======== tableScrollPane ========
        {
            tableScrollPane.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);

            //---- table ----
            table.setFillsViewportHeight(true);
            table.setAutoResizeMode(JTable.AUTO_RESIZE_ALL_COLUMNS);
            tableScrollPane.setViewportView(table);
        }

        //---- clearButton ----
        clearButton.setText("Clear map");

        //---- removeButton ----
        removeButton.setText("Remove key-value pair");

        //---- putButton ----
        putButton.setText("Put key-value pair");

        //---- keyLabel ----
        keyLabel.setText("Key:");

        //---- valueLabel ----
        valueLabel.setText("Value:");

        //======== eventLogScrollPane ========
        {
            eventLogScrollPane.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
            eventLogScrollPane.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);

            //---- eventLogArea ----
            eventLogArea.setEditable(false);
            eventLogArea.setText("qweqwe");
            eventLogScrollPane.setViewportView(eventLogArea);
        }

        //---- eventLogLabel ----
        eventLogLabel.setText("Event log:");

        GroupLayout layout = new GroupLayout(this);
        setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup()
                .addGroup(layout.createSequentialGroup()
                    .addContainerGap()
                    .addComponent(tableScrollPane, GroupLayout.DEFAULT_SIZE, 294, Short.MAX_VALUE)
                    .addPreferredGap(LayoutStyle.ComponentPlacement.UNRELATED)
                    .addGroup(layout.createParallelGroup()
                        .addGroup(layout.createParallelGroup(GroupLayout.Alignment.LEADING, false)
                            .addComponent(removeButton, GroupLayout.DEFAULT_SIZE, GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
                            .addComponent(clearButton, GroupLayout.Alignment.TRAILING)
                            .addComponent(putButton, GroupLayout.Alignment.TRAILING)
                            .addGroup(GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                .addComponent(keyLabel)
                                .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(keyField, GroupLayout.PREFERRED_SIZE, 104, GroupLayout.PREFERRED_SIZE))
                            .addGroup(GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                .addComponent(valueLabel)
                                .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                                .addComponent(valueField, GroupLayout.PREFERRED_SIZE, 104, GroupLayout.PREFERRED_SIZE))
                            .addComponent(separator)
                            .addComponent(eventLogScrollPane))
                        .addComponent(eventLogLabel))
                    .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup()
                .addGroup(layout.createSequentialGroup()
                    .addContainerGap()
                    .addGroup(layout.createParallelGroup()
                        .addComponent(tableScrollPane, GroupLayout.DEFAULT_SIZE, 323, Short.MAX_VALUE)
                        .addGroup(layout.createSequentialGroup()
                            .addComponent(clearButton)
                            .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                            .addComponent(removeButton)
                            .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                            .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                                .addComponent(keyField, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
                                .addComponent(keyLabel))
                            .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                            .addGroup(layout.createParallelGroup(GroupLayout.Alignment.BASELINE)
                                .addComponent(valueField, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
                                .addComponent(valueLabel))
                            .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                            .addComponent(putButton)
                            .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                            .addComponent(separator, GroupLayout.PREFERRED_SIZE, GroupLayout.DEFAULT_SIZE, GroupLayout.PREFERRED_SIZE)
                            .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                            .addComponent(eventLogLabel)
                            .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                            .addComponent(eventLogScrollPane, GroupLayout.DEFAULT_SIZE, 143, Short.MAX_VALUE)))
                    .addContainerGap())
        );
    }

    private JScrollPane tableScrollPane;
    private JTable table;
    private JButton clearButton;
    private JButton removeButton;
    private JButton putButton;
    private JTextField keyField;
    private JTextField valueField;
    private JLabel keyLabel;
    private JLabel valueLabel;
    private JSeparator separator;
    private JScrollPane eventLogScrollPane;
    private JTextArea eventLogArea;
    private JLabel eventLogLabel;
}
