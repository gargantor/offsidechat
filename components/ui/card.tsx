function Card2(){
    return(        
        <div className="card bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" >
            <div className="card-header p-3 bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <h5 className="card-title">Card title</h5>

            </div>
            <div className="card-body hover:bg-slate-50 border-b border-slate-100">
                <div className="flex py-4 px-4">
                <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
                </div>
            </div>
        </div>
    )
}
function Card({
    children,
    ...props
}) {
    return (
        <div className="card bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden" >
            {children}
        </div>
    )
    
}
function CardHeader({
    children,
    ...props
}) {
    return (
        <div className="card-header p-3 bg-slate-50 border-b border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">
                {children}
        </div>
    )
    
}
function CardBody({
    children,
    ...props
}) {
    return(
        <div className="card-body hover:bg-slate-50 border-b border-slate-100">
            {children}
        </div>
    )
    
}
function CardFotter({
    ...props
}) {
    
}
export {Card, CardHeader, CardBody, CardFotter, Card2}