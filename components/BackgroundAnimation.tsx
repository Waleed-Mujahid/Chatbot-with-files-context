import React from 'react';

export default function BackgroundAnimation() {
    return (
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
            <div className="relative flex justify-center items-center w-full h-full max-w-[500px] max-h-[500px]">
                <div className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-yellow-400 rounded-full filter blur-[35px] animate-yellowBlob" />
                <div className="absolute top-[16%] right-[-4%] w-[50%] h-[40%] bg-green-400 rounded-full filter blur-[35px] animate-greenBlob" />
                <div className="absolute top-[60%] right-0 w-[40%] h-[50%] bg-red-400 rounded-full filter blur-[35px] animate-redBlob" />
            </div>
        </div>
    );
}