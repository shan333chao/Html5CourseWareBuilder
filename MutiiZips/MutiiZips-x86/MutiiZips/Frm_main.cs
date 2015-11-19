using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;

using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using Ionic.Zip;
using System.Diagnostics;
using Aspose.Imaging;
using Magick;
using ImageMagick;
namespace MutiiZips
{
    public partial class frmMutilZips : Form
    {
        private String templatePath = string.Empty;
        private String templateHtml = String.Empty;
        public frmMutilZips()
        {
            InitializeComponent();
            templatePath = Application.StartupPath + "\\CourseTemplate\\Index.html";
            templateHtml = Application.StartupPath + "\\Index.html";
            if (!File.Exists(templatePath))
            {
                MessageBox.Show("模板文件找不到");
            }
        }



        private List<String> listImageFiles = new List<string>();
        private string commonLi = @"<li><img src='img/{0}'></li>";
        private string firstLi = @"<li class='current'><img src='img/{0}'></li>";
        private string allLis = String.Empty;
        private void btnChoseFolder_Click(object sender, EventArgs e)
        {
            allLis = "";
            lbSubFolders.Items.Clear();
            listImageFiles.Clear();
            lblStatus.Text = "正在选择文件夹";
            String selectImgFolder = ChoseFolders(txtFolderUrl.Text);
            var listFiles = getSubFolders(selectImgFolder); 

            if (!String.IsNullOrWhiteSpace(selectImgFolder) && listFiles.Count > 0)
            {

                try
                {
                    txtFolderUrl.Text = selectImgFolder;
                    var fileNames = listFiles.OrderBy(p => int.Parse(Path.GetFileName(p).Split('.')[0])).ToList();
                    for (int i = 0; i < fileNames.Count; i++)
                    {
                        if (i == 0)
                        {
                            allLis += String.Format(firstLi, Path.GetFileName(fileNames[i]));
                        }
                        else
                        {
                            allLis += String.Format(commonLi, Path.GetFileName(fileNames[i]));
                        }
                        ///如果选中旋转图片
                        if (chk_RotateFlip.Checked)
                        {
                            RotateImage(fileNames[i]);
                        } 
                        listImageFiles.Add(fileNames[i]);
                    }
                    lbSubFolders.Items.AddRange(fileNames.ToArray());
                    btnBuildCourse.Enabled = true;
                    lblStatus.Text = "读取完成";
                }
                catch (FormatException ex)
                { 
                    MessageBox.Show("请勾选修复文件名\r\n"+ex.Message);
                }
                catch (Exception ex){
                    MessageBox.Show(ex.Message);
                }
            }

        }

        /// <summary>
        /// 选择文件
        /// </summary>
        /// <returns></returns>
        public string ChoseFolders(String path)
        {
            FolderBrowserDialog dilog = new FolderBrowserDialog();
            dilog.Description = "请选择文件夹";
            dilog.ShowNewFolderButton = true;
            dilog.SelectedPath = path;
            DialogResult result = dilog.ShowDialog();
            if (result == DialogResult.OK || result == DialogResult.Yes)
            {
                lblStatus.Text = "正在读取图片";
                return dilog.SelectedPath;
            }
            else
            {
                lblStatus.Text = "";
            }
            return "";
        }
        /// <summary>
        /// 复制图片
        /// </summary>
        /// <param name="listImages"></param>
        /// <param name="folder"></param>
        public void copyImages(List<String> listImages, String folder)
        {
            if (listImages.Count > 0)
            {
                foreach (var item in listImageFiles)
                {
                    String destinationFile = folder + "\\" + Path.GetFileName(item);
                    File.Copy(item, destinationFile, true);
                }
                foreach (var item in listImageFiles)
                {
                    if (File.Exists(item))
                    {
                        File.Delete(item);
                    }
                }
            }
        }
        /// <summary>
        /// 获取目录下的文件
        /// </summary>
        /// <param name="rootFolder"></param>
        /// <returns></returns>
        public List<String> getSubFolders(String rootFolder)
        {
            List<string> listFiles = new List<string>();
            if (!String.IsNullOrWhiteSpace(rootFolder))
            {
                DirectoryInfo folder = new DirectoryInfo(rootFolder);
                FileInfo[] files = folder.GetFiles("*.jpg");
                if (files.Length > 0)
                {
         
                    foreach (var item in files)
                    {
                        if (chk_FileRename.Checked && item.Name.Contains("幻灯片"))
                        {
                            String newName = Path.Combine(item.Directory.FullName, item.Name.Replace("幻灯片", ""));
                            item.MoveTo(newName);
                        }
                        listFiles.Add(item.FullName);
                    }
                }


            }
            return listFiles;
        }
        /// <summary>
        /// 生成课件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnBuildCourse_Click(object sender, EventArgs e)
        {
            if (lbSubFolders.Items.Count > 0)
            {
                BuildHtml();
            }
            else
            {
                MessageBox.Show("请选择文件夹");
            }
        }
        /// <summary>  
        /// 复制文件夹  
        /// </summary>  
        /// <param name="sourceFolder">待复制的文件夹</param>  
        /// <param name="destFolder">复制到的文件夹</param>  
        private void CopyFolder(string sourceFolder, string destFolder)
        {
            if (!Directory.Exists(destFolder))
            {
                Directory.CreateDirectory(destFolder);
            }
            string[] files = Directory.GetFiles(sourceFolder);
            foreach (string file in files)
            {
                string name = Path.GetFileName(file);

                string dest = Path.Combine(destFolder, name);

                File.Copy(file, dest, true);
            }
            string[] folders = Directory.GetDirectories(sourceFolder);
            foreach (string folder in folders)
            {
                string name = Path.GetFileName(folder);

                string dest = Path.Combine(destFolder, name);

                CopyFolder(folder, dest);
            }
        }
        public void BuildHtml()
        {
            String fileDestination = txtFolderUrl.Text + "\\Index.html";
            if (!File.Exists(fileDestination))
            {
        
                String templateStr = File.ReadAllText(templatePath, Encoding.UTF8);
                String combineHtml = String.Format(templateStr, allLis);

                CopyFolder(Path.GetDirectoryName(templatePath), txtFolderUrl.Text);

                copyImages(listImageFiles, txtFolderUrl.Text + "\\img");
                File.WriteAllText(fileDestination, combineHtml, Encoding.UTF8);
                CreateZip(txtFolderUrl.Text);
                btnBuildCourse.Enabled = false;
            }
            else
            {
                MessageBox.Show("文件：\r\n" + fileDestination + "\r\n已存在，请重新选择路径");
            }
        }

        public String CreateZip(String folder)
        {
            String zipFilePath = folder;
            if (Directory.Exists(folder))
            {
                if (File.Exists(zipFilePath))
                {
                    File.Delete(zipFilePath);
                }
                String[] dir = Directory.GetDirectories(folder);
                String[] files = Directory.GetFiles(folder);
                using (ZipFile zip = new ZipFile())
                {
                    zip.SaveProgress += zip_SaveProgress;
                    foreach (var d in dir)
                    {
                        zip.AddDirectory(d, Path.GetFileName(d));
                    }
                    foreach (var f in files)
                    {
                        zip.AddFile(f, "");
                    }
                    String folderName = Path.GetFileName(folder);
                    zip.Comment = "CourseWare Created tools :\r\n" + folderName + DateTime.Now.ToString("-yyyy-MM-dd_HH_mm");
                    zipFilePath = folder + "\\" + folderName + ".zip";
                    zip.Save(zipFilePath);

                }
            }
            return zipFilePath;
        }

        void zip_SaveProgress(object sender, SaveProgressEventArgs e)
        {
            if (e.EventType == ZipProgressEventType.Saving_Completed)
            {

               DialogResult dResult= MessageBox.Show("课件制作成功:\r\n" + e.ArchiveName, "提醒", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
                //Process p = new Process("Explorer.exe");
               if (dResult==DialogResult.Yes)
               {
                   Process.Start("Explorer.exe", "/e,/select," + e.ArchiveName);
               }
          
            }
        }

        public void RotateImage(String imgFilePath)
        {
            //if (File.Exists(imgFilePath))
            //{
            //    using (Image img = Image.Load(imgFilePath))
            //    {
            //        img.RotateFlip(RotateFlipType.Rotate90FlipNone);

            //        img.Save();
            //    }
            //}
            if (File.Exists(imgFilePath))
            {
 
                    using (MagickImage image = new MagickImage(imgFilePath))
                    {
                        image.Rotate(90.00);
                        image.Write(imgFilePath);
                    }
  
            } 
        }

        private void frmMutilZips_Load(object sender, EventArgs e)
        {
            Control.CheckForIllegalCrossThreadCalls = false;
        }
    }
}
