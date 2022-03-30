import QuoteList from '../components/quotes/QuoteList'

const DUMMY_QUOTES = [
    {id: 'q1', author: 'Peter', text: 'Peter parker is spiderman!'},
    {id: 'q1', author: 'Clark', text: 'Clark Kent is superman!'},
]



const AllQuotes = () => {
    return(
        <QuoteList quotes={DUMMY_QUOTES}/>
    )
}

export default AllQuotes