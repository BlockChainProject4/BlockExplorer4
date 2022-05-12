import React from 'react';
import './UserTradList.css'

function User({ user , created_date}) {
        return (
        <div className='tradContainer'>
            <div className='tradUser'>
                <b>사용자 : {user.username}</b>  <br></br>
                <span>거래 코인 : {user.tradlist}</span><br></br>
                <span>보유 현황 : {user.tradinfo}</span><br></br>
                <p>
                    거래시간 : {new Date(created_date).toLocaleString()}
                </p>
            </div>
            {/* <div className='tradListContainer'>
                
            </div>
            <div className='tradListTradinfo'>
                
            </div> */}
        </div>
        );
    }

    function UserTradList() {
        const users = [
        {
            id: 1,
            username: 'hyein',
            tradlist: '도지코인',
            tradinfo: '110000.48KRW',
            created_date: new Date().getTime()

        },
        {
            id: 2,
            username: 'Junghyun',
            tradlist: '도지코인',
            tradinfo: '12356789.12KRW',
            created_date: new Date().getTime()


        },
        {
            id: 3,
            username: 'taehyun',
            tradlist: '도지코인',
            tradinfo: '4302023.32KRW',
            created_date: new Date().getTime()
        }
        ];
    
        return (
        <div>
            {users.map(user => (
            <User user={user} key={user.id} />
            ))}
        </div>
    );
}

export default UserTradList;