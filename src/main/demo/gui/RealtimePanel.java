package main.demo.gui;

import java.awt.*;
import gx.realtime.*;
import gx.realtime.Event;

import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.event.ListSelectionEvent;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * Swing panel that handles the display and interaction with the Realtime library
 */
public class RealtimePanel extends JPanel
{
    private RealtimeTableModel model;
    private DefaultListModel<Collaborator> collaboratorListModel = new DefaultListModel<>();
    private DefaultListModel<Event> eventListModel = new DefaultListModel<>();

    public RealtimePanel(Document document, CollaborativeMap collabMap)
    {
        model = new RealtimeTableModel(collabMap);

        // Listen for ValueChangedEvents to update the UI
        collabMap.addEventListener(EventType.VALUE_CHANGED, (ValueChangedEvent event) -> {
            logEvent(event);

            if (event.isLocal())
                return;

            if (event.getNewValue() != null) {
                model.updateValue(event.getProperty(), (String) event.getNewValue(), event.isLocal());
            } else {
                model.removeValue(event.getProperty(), event.isLocal());
            }
        });
        collabMap.addEventListener(EventType.OBJECT_CHANGED, (ObjectChangedEvent event) -> {
            logEvent(event);
        });

        document.addEventListener(EventType.COLLABORATOR_JOINED, (CollaboratorJoinedEvent event) -> {
            logEvent(event);
            collaboratorListModel.addElement(event.getCollaborator());
        });
        document.addEventListener(EventType.COLLABORATOR_LEFT, (CollaboratorLeftEvent event) -> {
            logEvent(event);
            collaboratorListModel.removeElement(event.getCollaborator());
        });

        // Init the components
        initComponents();

        // Put a selection listener on the table to prefill the key/value fields
        table.getSelectionModel().addListSelectionListener((ListSelectionEvent e) -> {
            int row = table.getSelectedRow();
            if (row == -1)
                return;

            keyField.setText((String) model.getValueAt(row, 0));
            valueField.setText((String) model.getValueAt(row, 1));
        });
    }

    public void logEvent(Event event)
    {
        eventListModel.addElement(event);

        // Scroll to the bottom if the GUI is available already
        if(eventLogList.getVisibleRect() != null) {
            Rectangle visibleRect = eventLogList.getVisibleRect();
            visibleRect.y = eventLogList.getHeight() - visibleRect.height;
            eventLogList.scrollRectToVisible(visibleRect);
        }
    }

    /**
     * Method that creates the frame and handles some of the final setup actions.
     *
     * @param document
     * @param collabMap
     */
    public static void createUI(Document document, CollaborativeMap collabMap)
    {
        JFrame frame = new JFrame("Demo Realtime Gx Application");

        RealtimePanel newContentPane = new RealtimePanel(document, collabMap);
        newContentPane.setOpaque(true);
        frame.setContentPane(newContentPane);

        frame.pack();
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.addWindowListener(new WindowAdapter()
        {
            public void windowClosing(WindowEvent e)
            {
                System.out.println("Politely closing API link...");
                document.close();
            }
        });
        frame.setVisible(true);
    }

    private void clearButtonActionPerformed(ActionEvent e)
    {
        model.removeAll();
    }

    private void removeButtonActionPerformed(ActionEvent e)
    {
        // Save keys first to prevent changing indexes while in the process of deleting rows
        int[] rows = table.getSelectedRows();
        String[] keys = new String[rows.length];
        for (int i = 0; i < rows.length; i++) {
            keys[i] = (String) model.getValueAt(rows[i], 0);
        }

        // Remove values
        for (String key : keys) {
            model.removeValue(key, true);
        }
    }

    private void putButtonActionPerformed(ActionEvent e)
    {
        model.updateValue(keyField.getText(), valueField.getText(), true);
    }

    private void initComponents()
    {
        // JFormDesigner - Component initialization - DO NOT MODIFY  //GEN-BEGIN:initComponents
        tableScrollPane = new JScrollPane();
        table = new JTable(model);
        clearButton = new JButton();
        removeButton = new JButton();
        putButton = new JButton();
        keyField = new JTextField();
        valueField = new JTextField();
        keyLabel = new JLabel();
        valueLabel = new JLabel();
        eventLogScrollPane = new JScrollPane();
        eventLogList = new JList(eventListModel);
        eventLogList.setCellRenderer(new EventRenderer());
        eventLogLabel = new JLabel();
        label1 = new JLabel();
        collabListScrollPane = new JScrollPane();
        collabList = new JList(collaboratorListModel);
        collabList.setCellRenderer(new CollaboratorRenderer());

        //======== this ========

        // JFormDesigner evaluation mark
        setBorder(new javax.swing.border.CompoundBorder(
            new javax.swing.border.TitledBorder(new javax.swing.border.EmptyBorder(0, 0, 0, 0),
                "JFormDesigner Evaluation", javax.swing.border.TitledBorder.CENTER,
                javax.swing.border.TitledBorder.BOTTOM, new java.awt.Font("Dialog", java.awt.Font.BOLD, 12),
                java.awt.Color.red), getBorder())); addPropertyChangeListener(new java.beans.PropertyChangeListener(){public void propertyChange(java.beans.PropertyChangeEvent e){if("border".equals(e.getPropertyName()))throw new RuntimeException();}});


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
        clearButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                clearButtonActionPerformed(e);
            }
        });

        //---- removeButton ----
        removeButton.setText("Remove selection");
        removeButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                removeButtonActionPerformed(e);
            }
        });

        //---- putButton ----
        putButton.setText("Put key-value pair");
        putButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                putButtonActionPerformed(e);
            }
        });

        //---- keyField ----
        keyField.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                putButtonActionPerformed(e);
            }
        });

        //---- valueField ----
        valueField.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                putButtonActionPerformed(e);
            }
        });

        //---- keyLabel ----
        keyLabel.setText("Key:");

        //---- valueLabel ----
        valueLabel.setText("Value:");

        //======== eventLogScrollPane ========
        {
            eventLogScrollPane.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
            eventLogScrollPane.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
            eventLogScrollPane.setViewportView(eventLogList);
        }

        //---- eventLogLabel ----
        eventLogLabel.setText("Event log:");

        //---- label1 ----
        label1.setText("Collaborators:");

        //======== collabListScrollPane ========
        {
            collabListScrollPane.setViewportView(collabList);
        }

        GroupLayout layout = new GroupLayout(this);
        setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup()
                .addGroup(layout.createSequentialGroup()
                    .addContainerGap()
                    .addGroup(layout.createParallelGroup()
                        .addComponent(eventLogScrollPane)
                        .addGroup(layout.createSequentialGroup()
                            .addGroup(layout.createParallelGroup()
                                .addComponent(tableScrollPane, GroupLayout.DEFAULT_SIZE, 367, Short.MAX_VALUE)
                                .addGroup(layout.createSequentialGroup()
                                        .addComponent(eventLogLabel)
                                        .addGap(251, 251, 251)))
                            .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                            .addGroup(layout.createParallelGroup()
                                .addGroup(layout.createSequentialGroup()
                                        .addComponent(label1)
                                        .addGap(0, 124, Short.MAX_VALUE))
                                .addGroup(GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
                                        .addGap(0, 60, Short.MAX_VALUE)
                                        .addGroup(layout.createParallelGroup()
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
                                                .addComponent(removeButton, GroupLayout.Alignment.TRAILING, GroupLayout.PREFERRED_SIZE, 145, GroupLayout.PREFERRED_SIZE)))
                                .addComponent(collabListScrollPane, GroupLayout.DEFAULT_SIZE, 205, Short.MAX_VALUE))))
                    .addContainerGap())
        );
        layout.setVerticalGroup(
            layout.createParallelGroup()
                .addGroup(layout.createSequentialGroup()
                    .addContainerGap()
                    .addGroup(layout.createParallelGroup()
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
                            .addComponent(label1)
                            .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                            .addComponent(collabListScrollPane, GroupLayout.DEFAULT_SIZE, 117, Short.MAX_VALUE))
                        .addComponent(tableScrollPane, GroupLayout.DEFAULT_SIZE, 0, Short.MAX_VALUE))
                    .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                    .addComponent(eventLogLabel)
                    .addPreferredGap(LayoutStyle.ComponentPlacement.RELATED)
                    .addComponent(eventLogScrollPane, GroupLayout.PREFERRED_SIZE, 113, GroupLayout.PREFERRED_SIZE)
                    .addContainerGap())
        );
        // JFormDesigner - End of component initialization  //GEN-END:initComponents
    }

    // JFormDesigner - Variables declaration - DO NOT MODIFY  //GEN-BEGIN:variables
    private JScrollPane tableScrollPane;
    private JTable table;
    private JButton clearButton;
    private JButton removeButton;
    private JButton putButton;
    private JTextField keyField;
    private JTextField valueField;
    private JLabel keyLabel;
    private JLabel valueLabel;
    private JScrollPane eventLogScrollPane;
    private JList eventLogList;
    private JLabel eventLogLabel;
    private JLabel label1;
    private JScrollPane collabListScrollPane;
    private JList collabList;
    // JFormDesigner - End of variables declaration  //GEN-END:variables
}

/**
 * Custom renderer to display the Collaborators in our list
 */
class CollaboratorRenderer extends DefaultListCellRenderer {
    @Override
    public Component getListCellRendererComponent(
            JList list,
            Object value,
            int index,
            boolean selected,
            boolean expanded) {

        Collaborator collaborator = (Collaborator) value;
        JLabel label = null;

        try {
            String urlString = collaborator.getPhotoUrl();
            if(!urlString.substring(0, 4).equals("http"))
                urlString = "https:" + urlString;

            Image image = ImageIO.read(new URL(urlString));
            ImageIcon imageIcon = new ImageIcon(image.getScaledInstance(50, 50, Image.SCALE_SMOOTH));
            label = new JLabel(collaborator.getDisplayName(), imageIcon, JLabel.LEFT);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        label.setForeground(Color.decode(collaborator.getColor()));

        return label;
    }
}

/**
 * Renderer for the event log list.
 */
class EventRenderer extends DefaultListCellRenderer {
    @Override
    public Component getListCellRendererComponent(
            JList list,
            Object value,
            int index,
            boolean selected,
            boolean expanded) {

        JLabel label = new JLabel();

        if (value instanceof ValueChangedEvent) {
            ValueChangedEvent event = (ValueChangedEvent) value;
            label.setText(event.toString());
        } else if (value instanceof CollaboratorJoinedEvent) {
            CollaboratorJoinedEvent event = (CollaboratorJoinedEvent) value;
            label.setText(event.toString());
        } else if (value instanceof CollaboratorLeftEvent) {
            CollaboratorLeftEvent event = (CollaboratorLeftEvent) value;
            label.setText(event.toString());
        }

//        label.setForeground(Color.decode(collaborator.getColor()));

        return label;
    }
}