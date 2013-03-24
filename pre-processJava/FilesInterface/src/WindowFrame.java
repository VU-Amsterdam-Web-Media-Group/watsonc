import javax.swing.*;
import java.awt.event.*;
import java.awt.*;
import java.io.IOException;
import java.io.File;

public class WindowFrame extends JPanel implements ActionListener {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	JButton chooseTextFolder, applyFilter, chooseJobFiles;
	JButton chooseCsvFolder;
	JLabel jLabel1, jLabel2, jLabel3, jLabel4, jLabel5, jLabel6; 

	JFileChooser chooserText;
	JFileChooser chooserCSV;
	JFileChooser chooserJobFiles;
	String destFolder;
	private JTextField field1, field2, field3, field4, field5, field6; 
	JCheckBox filter1, filter2, filter3;
	JRadioButton filter1Opt1, filter1Opt2, filter1Opt3, filter1Opt4, filter1Opt5;
	JRadioButton filter2Opt1, filter2Opt2, filter2Opt3;
	JRadioButton filter3Opt1, filter3Opt2;
	ButtonGroup group1 = new ButtonGroup();
	ButtonGroup group2 = new ButtonGroup();
	ButtonGroup group3 = new ButtonGroup();
	static JFrame frame;

	public WindowFrame() {
		initComponents();
	}

	public void initComponents() {
		// elements for choosing the folder with text files
		jLabel1 = new JLabel();
		jLabel1.setText("1. Choose the text files:"); 
		add(jLabel1);
		chooseTextFolder = new JButton("Create CSV");
		chooseTextFolder.addActionListener(this);
		add(chooseTextFolder);
		field1 = new JTextField();  
		field1.setText("The output folder will be here!");
		field1.setEditable(false); 
		field1.setAlignmentX(RIGHT_ALIGNMENT);
		field1.setPreferredSize(new Dimension(350, 20));
		add(field1);  

		// elements for choosing the csv files that need to be formatted 
		jLabel2 = new JLabel();
		jLabel2.setText("2. Format csv files:");
		add(jLabel2);
		chooseCsvFolder = new JButton("Create All CSV");
		chooseCsvFolder.addActionListener(this);
		add(chooseCsvFolder);
		field2 = new JTextField();  
		field2.setText("The output folder will be here!");
		field2.setEditable(false); 
		field2.setAlignmentX(RIGHT_ALIGNMENT);
		field2.setPreferredSize(new Dimension(368, 20));
		add(field2);  

		// elements for applying filters 
		jLabel3 = new JLabel();
		jLabel3.setText("3. Apply filters:");
		jLabel3.setPreferredSize(new Dimension(646, 20));
		add(jLabel3);

		filter1 = new JCheckBox("Semicolon and key term between brackets");
		filter1.setSelected(true);
		filter1.setEnabled(false);
		filter2 = new JCheckBox("Cluster on relation type");
		filter2.setSelected(true);
		filter2.setEnabled(false);
		filter3 = new JCheckBox("Length");
		filter3.setEnabled(false);
		filter3.setSelected(true);

		JPanel checkPanel = new JPanel(new GridLayout(0, 1));
		checkPanel.setSize(700, 400);
		filter1Opt1 = new JRadioButton("Sentences without semicolon");
		filter1Opt2 = new JRadioButton("Sentences with semicolon");
		filter1Opt3 = new JRadioButton("Sentences without key word between brackets");
		filter1Opt4 = new JRadioButton("Sentences with key word between brackets");
		filter1Opt5 = new JRadioButton("Sentences without special cases");
		filter1Opt5.setSelected(true);
		filter1Opt1.setActionCommand("A");
		checkPanel.add(filter1);
		checkPanel.add(filter1Opt1);
		group1.add(filter1Opt1);
		filter1Opt2.setActionCommand("B");
		checkPanel.add(filter1Opt2);
		group1.add(filter1Opt2);
		filter1Opt3.setActionCommand("C");
		checkPanel.add(filter1Opt3);
		group1.add(filter1Opt3);
		filter1Opt4.setActionCommand("D");
		checkPanel.add(filter1Opt4);
		group1.add(filter1Opt4);
		filter1Opt5.setActionCommand("E");
		checkPanel.add(filter1Opt5);
		group1.add(filter1Opt5);

		filter2Opt1 = new JRadioButton("Sentences with relation between the two terms");
		filter2Opt2 = new JRadioButton("Sentences with relation outside the two terms");
		filter2Opt3 = new JRadioButton("Sentences without relation");
		filter2Opt1.setSelected(true);
		filter2Opt1.setActionCommand("A");
		checkPanel.add(filter2);
		checkPanel.add(filter2Opt1);
		group2.add(filter2Opt1);
		filter2Opt2.setActionCommand("B");
		checkPanel.add(filter2Opt2);
		group2.add(filter2Opt2);
		filter2Opt3.setActionCommand("C");
		checkPanel.add(filter2Opt3);
		group2.add(filter2Opt3);

		filter3Opt1 = new JRadioButton("Long sentences");
		filter3Opt2 = new JRadioButton("Short and average sentences");
		filter3Opt2.setSelected(true);
		filter3Opt1.setActionCommand("A");
		checkPanel.add(filter3);
		checkPanel.add(filter3Opt1);
		group3.add(filter3Opt1);
		filter3Opt2.setActionCommand("B");
		checkPanel.add(filter3Opt2);
		group3.add(filter3Opt2);
		add(checkPanel, BorderLayout.LINE_START);

		applyFilter = new JButton("Apply filters");
		applyFilter.addActionListener(this);
		add(applyFilter);
		field3 = new JTextField();  
		field3.setText("The output folder will be here!");
		field3.setEditable(false); 
		field3.setPreferredSize(new Dimension(640, 20));
		add(field3);  

		// elements for creating the job file
		jLabel4 = new JLabel();
		jLabel4.setText("4. Create job file:"); 
		jLabel4.setPreferredSize(new Dimension(646, 20));
		add(jLabel4);
		jLabel5 = new JLabel();
		jLabel5.setText("Sentences:"); 
		add(jLabel5);
		field5 = new JTextField(2);  
		field5.setEditable(true); 
		add(field5); 
		jLabel5 = new JLabel();
		jLabel5.setText("Give a name to the job file"); 
		add(jLabel5);
		field6 = new JTextField(20);  
		field6.setEditable(true); 
		add(field6); 
		chooseJobFiles = new JButton("Choose files");
		chooseJobFiles.addActionListener(this);
		add(chooseJobFiles);

		field4 = new JTextField();  
		field4.setText("The output file will be here!");
		field4.setEditable(false); 
		field4.setPreferredSize(new Dimension(640, 20));
		add(field4);  

		//		field6 = new JTextField();  
		//		field6.setText("No. of sentences:");
		//		field6.setEditable(false); 
		//		add(field6);  
		//		field7 = new JTextField();  
		//		field7.setText("Choose files:");
		//		field7.setEditable(false); 
		//		add(field7); 
	}

	public void actionPerformed(ActionEvent e) {
		if (e.getSource().equals(chooseTextFolder)) {
			chooserText = new JFileChooser(); 
			chooserText.setCurrentDirectory(new java.io.File("."));
			chooserText.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
			chooserText.setAcceptAllFileFilterUsed(false);
			//    
			if (chooserText.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) { 
				System.out.println("getCurrentDirectory(): " + chooserText.getCurrentDirectory());
				System.out.println("getSelectedFile() : " + chooserText.getSelectedFile());
				destFolder = chooserText.getCurrentDirectory() + "/csvFiles";
				try {
				//	Runtime.getRuntime().exec("java -jar /home/oana/Desktop/CreateCSVFile.jar " + chooserText.getSelectedFile() + " " + destFolder);
					Runtime.getRuntime().exec("java -jar CreateCSVFile.jar " + chooserText.getSelectedFile() + " " + destFolder);
					field1.setText("Output: " + destFolder);	
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
			else {
				System.out.println("No Selection ");
			}
		}
		else if (e.getSource().equals(chooseCsvFolder)){

			chooserCSV = new JFileChooser(); 
			chooserCSV.setCurrentDirectory(new java.io.File("."));
			chooserCSV.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
			chooserCSV.setAcceptAllFileFilterUsed(false);
			//    
			if (chooserCSV.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) { 
				System.out.println("getCurrentDirectory(): " + chooserCSV.getCurrentDirectory());
				System.out.println("getSelectedFile() : " + chooserCSV.getSelectedFile());

				destFolder = chooserCSV.getCurrentDirectory() + "/allCsvFiles";

				try {

				//	Runtime.getRuntime().exec("java -jar /home/oana/Desktop/FormatInputFile.jar " + chooserCSV.getSelectedFile() + " " + destFolder);
					Runtime.getRuntime().exec("java -jar FormatInputFile.jar " + chooserCSV.getSelectedFile() + " " + destFolder);
					field2.setText("Output: " + destFolder);	
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
			else {
				System.out.println("No Selection ");
			}
		}
		else if (e.getSource().equals(applyFilter)) {
			String selectedDir1 = null;
			String selectedDir2 = null;
			String selectedDir3 = null;
			if (group1.getSelection().getActionCommand().equals("A")) {
				selectedDir1 = chooserCSV.getCurrentDirectory() + "/noSemicolon";
			}
			else if (group1.getSelection().getActionCommand().equals("B")) {
				selectedDir1 = chooserCSV.getCurrentDirectory() + "/withSemicolon";
			}
			else if (group1.getSelection().getActionCommand().equals("C")) {
				selectedDir1 = chooserCSV.getCurrentDirectory() + "/noTermBetweenBr";
			}
			else if (group1.getSelection().getActionCommand().equals("D")) {
				selectedDir1 = chooserCSV.getCurrentDirectory() + "/withTermBetweenBr";
			}
			else if (group1.getSelection().getActionCommand().equals("E")) {
				selectedDir1 = chooserCSV.getCurrentDirectory() + "/noSpecialCase";
			}

			if (group2.getSelection().getActionCommand().equals("A")) {
				selectedDir2 = chooserCSV.getCurrentDirectory() + "/withRelationsBetween";
			}
			else if (group2.getSelection().getActionCommand().equals("B")) {
				selectedDir2 = chooserCSV.getCurrentDirectory() + "/withRelationsOutside";
			}
			else if (group2.getSelection().getActionCommand().equals("C")) {
				selectedDir2 = chooserCSV.getCurrentDirectory() + "/noRelation";
			}

			if (group3.getSelection().getActionCommand().equals("A")) {
				selectedDir3 = chooserCSV.getCurrentDirectory() + "/long";
			}
			else if (group3.getSelection().getActionCommand().equals("B")) {
				selectedDir3 = chooserCSV.getCurrentDirectory() + "/shortAndAverage";
			}

			try {
				System.out.println(destFolder);
				System.out.println(chooserCSV.getCurrentDirectory());
			//	Process p = Runtime.getRuntime().exec("java -jar /home/oana/Desktop/SpecialChars.jar " + destFolder + " " + chooserCSV.getCurrentDirectory());
				Process p = Runtime.getRuntime().exec("java -jar SpecialChars.jar " + destFolder + " " + chooserCSV.getCurrentDirectory());	
				int resp = p.waitFor();
				if (resp == 0) {
				//	p = Runtime.getRuntime().exec("java -jar /home/oana/Desktop/ClusterOnRelation.jar " + selectedDir1 + " " + chooserCSV.getCurrentDirectory());	
					p = Runtime.getRuntime().exec("java -jar ClusterOnRelation.jar " + selectedDir1 + " " + chooserCSV.getCurrentDirectory());	
					resp = p.waitFor();
					if (resp == 0) {
					//	p = Runtime.getRuntime().exec("java -jar /home/oana/Desktop/LengthSelection.jar " + selectedDir2 + " " + chooserCSV.getCurrentDirectory());
						p = Runtime.getRuntime().exec("java -jar LengthSelection.jar " + selectedDir2 + " " + chooserCSV.getCurrentDirectory());	
						resp = p.waitFor();
						if (resp == 0) {
							field3.setText("Output: " + selectedDir3);
						}
					}
				}
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			} catch (InterruptedException ee) {
				// TODO Auto-generated catch block
				ee.printStackTrace();
			}

		}
		else if (e.getSource().equals(chooseJobFiles)) {
			chooserJobFiles = new JFileChooser(); 
			chooserJobFiles.setCurrentDirectory(new java.io.File("."));
			chooserJobFiles.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
			chooserJobFiles.setAcceptAllFileFilterUsed(false);
			if (chooserJobFiles.showOpenDialog(this) == JFileChooser.APPROVE_OPTION) { 
				System.out.println("getCurrentDirectory(): " + chooserJobFiles.getCurrentDirectory());
				System.out.println("getSelectedFile() : " + chooserJobFiles.getSelectedFile());

				int noFile = 0;
				for (File file : chooserJobFiles.getSelectedFile().listFiles()) {  
					if (file.isFile()) {  
						noFile++;  
					}  
				}  
				
				int totalSent = Integer.parseInt(field5.getText());	
//				int eachFile = (int)Math.ceil(totalSent / noFile);
				try {

				//	Runtime.getRuntime().exec("java -jar /home/oana/Desktop/JobFileCreation.jar " + totalSent + " " + chooserJobFiles.getSelectedFile() + " " + chooserJobFiles.getCurrentDirectory() + "/" + field6.getText() + ".csv");
					Runtime.getRuntime().exec("java -jar JobFileCreation.jar " + totalSent + " " + chooserJobFiles.getSelectedFile() + " " + chooserJobFiles.getCurrentDirectory() + "/" + field6.getText() + ".csv");
					field4.setText("Output: " + chooserJobFiles.getCurrentDirectory() + "/" + field6.getText() + ".csv");	
				} catch (IOException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
			else {
				System.out.println("No Selection ");
			}
		}
	}

	public Dimension getPreferredSize(){
		return new Dimension(700, 540);
	}

	public static void main(String s[]) {
		frame = new JFrame("");
		WindowFrame panel = new WindowFrame();
		frame.addWindowListener(
				new WindowAdapter() {
					public void windowClosing(WindowEvent e) {
						System.exit(0);
					}
				}
				);
		frame.getContentPane().add(panel,"Center");
		frame.setSize(panel.getPreferredSize());
		frame.setVisible(true);
	}
}