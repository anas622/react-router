import { Route } from "react-router-dom"
import { useParams, Link, useRouteMatch } from "react-router-dom"
import { useEffect } from "react"
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from "../hooks/hooks/use-http"
import { getSingleQuote } from "../lib/lib/api"
import LoadingSpinner from "../components/UI/LoadingSpinner"


const QuoteDetail = () => {

    const params = useParams()
    const match = useRouteMatch()

    const {quoteId} = params;

    const {sendRequest, status, data:loadedQuote, error} = useHttp(getSingleQuote, true)

    useEffect(()=>{
        sendRequest(quoteId)
    },[sendRequest, quoteId])

    if(status==='pending'){
        return <div className="centered">
            <LoadingSpinner/>
        </div>
    }

    if(error){
        return <p className="centered">{error}</p>
    }

    if(!loadedQuote){
        return <p className="centered">No Quote Found</p>
    }


    return(
        <>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path = {`${match.path}/comments`}>
                <Comments/>
            </Route>
        </>
        
    )

}

export default QuoteDetail