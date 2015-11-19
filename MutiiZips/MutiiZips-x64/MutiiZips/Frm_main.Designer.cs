namespace MutiiZips
{
    partial class frmMutilZips
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnChoseFolder = new System.Windows.Forms.Button();
            this.txtFolderUrl = new System.Windows.Forms.TextBox();
            this.lbSubFolders = new System.Windows.Forms.ListBox();
            this.btnBuildCourse = new System.Windows.Forms.Button();
            this.chk_RotateFlip = new System.Windows.Forms.CheckBox();
            this.chk_FileRename = new System.Windows.Forms.CheckBox();
            this.lblFileList = new System.Windows.Forms.Label();
            this.lbl_FolderPath = new System.Windows.Forms.Label();
            this.lblStatus = new System.Windows.Forms.Label();
            this.CB_TempLists = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // btnChoseFolder
            // 
            this.btnChoseFolder.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.btnChoseFolder.Location = new System.Drawing.Point(664, 39);
            this.btnChoseFolder.Margin = new System.Windows.Forms.Padding(4);
            this.btnChoseFolder.Name = "btnChoseFolder";
            this.btnChoseFolder.Size = new System.Drawing.Size(100, 29);
            this.btnChoseFolder.TabIndex = 0;
            this.btnChoseFolder.Text = "选择目录";
            this.btnChoseFolder.UseVisualStyleBackColor = true;
            this.btnChoseFolder.Click += new System.EventHandler(this.btnChoseFolder_Click);
            // 
            // txtFolderUrl
            // 
            this.txtFolderUrl.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.txtFolderUrl.BackColor = System.Drawing.SystemColors.ButtonHighlight;
            this.txtFolderUrl.Location = new System.Drawing.Point(18, 43);
            this.txtFolderUrl.Margin = new System.Windows.Forms.Padding(4);
            this.txtFolderUrl.Name = "txtFolderUrl";
            this.txtFolderUrl.ReadOnly = true;
            this.txtFolderUrl.Size = new System.Drawing.Size(626, 25);
            this.txtFolderUrl.TabIndex = 1;
            // 
            // lbSubFolders
            // 
            this.lbSubFolders.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lbSubFolders.FormattingEnabled = true;
            this.lbSubFolders.ItemHeight = 15;
            this.lbSubFolders.Location = new System.Drawing.Point(19, 97);
            this.lbSubFolders.Margin = new System.Windows.Forms.Padding(4);
            this.lbSubFolders.Name = "lbSubFolders";
            this.lbSubFolders.Size = new System.Drawing.Size(755, 244);
            this.lbSubFolders.TabIndex = 2;
            // 
            // btnBuildCourse
            // 
            this.btnBuildCourse.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left)));
            this.btnBuildCourse.Enabled = false;
            this.btnBuildCourse.Location = new System.Drawing.Point(19, 357);
            this.btnBuildCourse.Margin = new System.Windows.Forms.Padding(4);
            this.btnBuildCourse.Name = "btnBuildCourse";
            this.btnBuildCourse.Size = new System.Drawing.Size(100, 29);
            this.btnBuildCourse.TabIndex = 3;
            this.btnBuildCourse.Text = "生成课件";
            this.btnBuildCourse.UseVisualStyleBackColor = true;
            this.btnBuildCourse.Click += new System.EventHandler(this.btnBuildCourse_Click);
            // 
            // chk_RotateFlip
            // 
            this.chk_RotateFlip.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.chk_RotateFlip.AutoSize = true;
            this.chk_RotateFlip.Location = new System.Drawing.Point(468, 17);
            this.chk_RotateFlip.Name = "chk_RotateFlip";
            this.chk_RotateFlip.Size = new System.Drawing.Size(150, 19);
            this.chk_RotateFlip.TabIndex = 4;
            this.chk_RotateFlip.Text = "图片向右旋转90°";
            this.chk_RotateFlip.UseVisualStyleBackColor = true;
            // 
            // chk_FileRename
            // 
            this.chk_FileRename.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.chk_FileRename.AutoSize = true;
            this.chk_FileRename.Checked = true;
            this.chk_FileRename.CheckState = System.Windows.Forms.CheckState.Checked;
            this.chk_FileRename.Location = new System.Drawing.Point(650, 17);
            this.chk_FileRename.Name = "chk_FileRename";
            this.chk_FileRename.Size = new System.Drawing.Size(104, 19);
            this.chk_FileRename.TabIndex = 5;
            this.chk_FileRename.Text = "修正文件名";
            this.chk_FileRename.UseVisualStyleBackColor = true;
            // 
            // lblFileList
            // 
            this.lblFileList.AutoSize = true;
            this.lblFileList.Location = new System.Drawing.Point(15, 78);
            this.lblFileList.Name = "lblFileList";
            this.lblFileList.Size = new System.Drawing.Size(67, 15);
            this.lblFileList.TabIndex = 6;
            this.lblFileList.Text = "图片列表";
            // 
            // lbl_FolderPath
            // 
            this.lbl_FolderPath.AutoSize = true;
            this.lbl_FolderPath.Location = new System.Drawing.Point(16, 21);
            this.lbl_FolderPath.Name = "lbl_FolderPath";
            this.lbl_FolderPath.Size = new System.Drawing.Size(91, 15);
            this.lbl_FolderPath.TabIndex = 7;
            this.lbl_FolderPath.Text = "PPT图片路径";
            // 
            // lblStatus
            // 
            this.lblStatus.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.lblStatus.AutoSize = true;
            this.lblStatus.ForeColor = System.Drawing.Color.Red;
            this.lblStatus.Location = new System.Drawing.Point(647, 364);
            this.lblStatus.Name = "lblStatus";
            this.lblStatus.Size = new System.Drawing.Size(0, 15);
            this.lblStatus.TabIndex = 8;
            // 
            // CB_TempLists
            // 
            this.CB_TempLists.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.CB_TempLists.FormattingEnabled = true;
            this.CB_TempLists.Location = new System.Drawing.Point(237, 15);
            this.CB_TempLists.Name = "CB_TempLists";
            this.CB_TempLists.Size = new System.Drawing.Size(198, 23);
            this.CB_TempLists.TabIndex = 9;
            this.CB_TempLists.SelectedIndexChanged += new System.EventHandler(this.CB_TempLists_SelectedIndexChanged);
            // 
            // label1
            // 
            this.label1.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(194, 21);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(37, 15);
            this.label1.TabIndex = 10;
            this.label1.Text = "模板";
            // 
            // frmMutilZips
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(799, 399);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.CB_TempLists);
            this.Controls.Add(this.lblStatus);
            this.Controls.Add(this.lbl_FolderPath);
            this.Controls.Add(this.lblFileList);
            this.Controls.Add(this.chk_FileRename);
            this.Controls.Add(this.chk_RotateFlip);
            this.Controls.Add(this.btnBuildCourse);
            this.Controls.Add(this.lbSubFolders);
            this.Controls.Add(this.txtFolderUrl);
            this.Controls.Add(this.btnChoseFolder);
            this.Margin = new System.Windows.Forms.Padding(4);
            this.MinimumSize = new System.Drawing.Size(817, 446);
            this.Name = "frmMutilZips";
            this.Text = "zip批量压缩";
            this.Load += new System.EventHandler(this.frmMutilZips_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnChoseFolder;
        private System.Windows.Forms.TextBox txtFolderUrl;
        private System.Windows.Forms.ListBox lbSubFolders;
        private System.Windows.Forms.Button btnBuildCourse;
        private System.Windows.Forms.CheckBox chk_RotateFlip;
        private System.Windows.Forms.CheckBox chk_FileRename;
        private System.Windows.Forms.Label lblFileList;
        private System.Windows.Forms.Label lbl_FolderPath;
        private System.Windows.Forms.Label lblStatus;
        private System.Windows.Forms.ComboBox CB_TempLists;
        private System.Windows.Forms.Label label1;
    }
}

