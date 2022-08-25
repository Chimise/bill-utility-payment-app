interface CopyRightProps {
    className?: string;
    mode?: 'light' | 'dark'
}


const CopyRight = ({mode = 'light', className}: CopyRightProps) => {

    const currentYear = new Date().getFullYear()

    return (<div className={`text-center py-4 px-2 border-0 border-t ${mode === 'light' ? 'border-slate-100 text-slate-100' : 'border-slate-500/50 text-slate-600'} ${className}`}>
        &copy; {currentYear} Nccommtech. All Rights reserved.
    </div>)
}


export default CopyRight;