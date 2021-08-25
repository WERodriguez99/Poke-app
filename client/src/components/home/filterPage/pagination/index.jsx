import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ReactPaginate  from 'react-paginate'
import { getPage } from '../../../actions'

import S from './pageBtts.module.css'
export default function Pagination() {
    
    const store = useSelector(state => state)
    const dispatch = useDispatch()

    const pokePage = 12;
    const pagNum = []
    const [ pageNum, setPageNum ] = useState(0)
    const pageVisited = pageNum * pokePage;

    
    
    for(let i = 1; i <= store.all; i++) {
        pagNum.push(i)
    }  
    
     const displayPokes =  pagNum.splice(pageVisited, pageVisited + pokePage) 

    const changePage = ({ selected }) => {
        setPageNum(selected)
    }

    useEffect(() => {
        dispatch(getPage(pageNum))
    }, [pageNum])

    return (
        <div>
             {/* <ul>
                {pagNum.splice(pageVisited, pageVisited + pokePage).map(num => 
                    (<li key={num}>
                        <input type="submit" value={num}/>
                    </li>)
                )} 
                </ul> */}
               { store.pokes && store.all > 13 &&                
               (<ReactPaginate 
                    previousLabel={"Previous"}
                    nextLabel0={"Next"}
                    pageCount={Math.ceil(store.all/pokePage)}
                    onPageChange={changePage}
                    containerClassName={S.paginationBttns}
                    previousClassName={S.previousBttn}
                    nextClassName={S.nextBttn}
                    disabledClassName={S.paginationDisabled}
                    activeClassName={S.paginationActive}
                />)
                   
               } 
        </div>
    ) 

}
