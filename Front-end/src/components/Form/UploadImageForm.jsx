import React, { useState } from "react";

import shortid from "shortid";


const UploadImageForm = () => {
    const [selectedfile, SetSelectedFile] = useState([]);
    const [Files, SetFiles] = useState([]);


    const filesizes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const InputChange = (e) => {
        // --For Multiple File Input
        let images = [];
        for (let i = 0; i < e.target.files.length; i++) {
            images.push((e.target.files[i]));
            let reader = new FileReader();
            let file = e.target.files[i];
            reader.onloadend = () => {
                SetSelectedFile((preValue) => {
                    return [
                        ...preValue,
                        {
                            id: shortid.generate(),
                            filename: e.target.files[i].name,
                            filetype: e.target.files[i].type,
                            fileimage: reader.result,
                            datetime: e.target.files[i].lastModifiedDate.toLocaleString('en-IN'),
                            filesize: filesizes(e.target.files[i].size)
                        }
                    ]
                });
            }
            if (e.target.files[i]) {
                reader.readAsDataURL(file);
            }
        }
    }


    const DeleteSelectFile = (id) => {
        if(window.confirm("この画像を削除してもよろしいですか?")){
            const result = selectedfile.filter((data) => data.id !== id);
            SetSelectedFile(result);
        }else{
            // alert('No');
        }
        
    }

    const FileUploadSubmit = async (e) => {
        e.preventDefault();

        // form reset on submit 
        e.target.reset();
        if (selectedfile.length > 0) {
            for (let index = 0; index < selectedfile.length; index++) {
                SetFiles((preValue)=>{
                    return[
                        ...preValue,
                        selectedfile[index]
                    ]   
                })
            }
            SetSelectedFile([]);
        } else {
            alert('Please select file')
        }
    }


    const DeleteFile = async (id) => {
        if(window.confirm("Are you sure you want to delete this Image?")){
            const result = Files.filter((data)=>data.id !== id);
            SetFiles(result);
        }else{
            // alert('No');
        }
    }
   
    return(
        
        <div className="fileupload-view ">
                <div>
                    <div className="w-[700px] h-[600px] overflow-auto">
                        <div className="mt-5">
                            <div className="card-body">
                                <div className="kb-data-box flex">
                                    <div className=' flex '>
                                        <div className='w-[177px] flex gap-[35px]  '>
                                            <span className='bg-[#63A4D4] h-[28px] inline-block p-1 rounded-md text-[15px] mx-[12px] text-white'>任意</span>
                                            <p className='text-[20px]'>物件概要</p>
                                        </div>
                                        
                                    </div>
                                    <form onSubmit={FileUploadSubmit}>
                                        <div className="kb-file-upload">
                                            <div className="file-upload-box">           
                                                <input type="file" id="fileupload" className="file-upload-input" onChange={InputChange} multiple />
                                                 <span className="file-link">画像ファイルを選択する</span>
                                            </div>
                                            <div><p className="pt-[12px] pl-[60px] text-[15px]">複数枚の画像を選択可能です。</p></div>
                                        </div>
                                        <div className="kb-attach-box mb-3">
                                            {
                                                selectedfile.map((data, index) => {
                                                    const { id, filename, filetype, fileimage, datetime, filesize } = data;
                                                    return (
                                                        <div className="file-atc-box" key={id}>
                                                            {
                                                                filename.match(/.(jpg|jpeg|png|gif|svg|jfif)$/i) ?
                                                                    <div className="file-image"> <img src={fileimage} alt="" /></div> :
                                                                    <div className="file-image"><i className="far fa-file-alt"></i></div>
                                                            }
                                                            <div className="file-detail flex justify-between">
                                                               <div>
                                                                <h6>{filename}</h6>
                                                                <p>サイズ: {filesize}</p>
                                                                <p>変更時刻: {datetime}</p>
                                                               </div>
                                                                <div className="file-actions ">
                                                                    <button type="button" className="file-action-btn" onClick={() => DeleteSelectFile(id)}><i className="fa-solid fa-trash text-[40px] pl-[15px]"></i></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        
                                    </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    );
}


export default UploadImageForm;