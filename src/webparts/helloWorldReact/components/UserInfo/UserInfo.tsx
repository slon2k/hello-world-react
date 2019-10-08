import * as React from 'react';
import styles from './UserInfo.module.scss';

type UserInfoProps = {
    email: string,
    name: string
};

export const UserInfo: React.FunctionComponent<UserInfoProps> = ({email, name}: UserInfoProps) => {
    return (
        <div className={ styles.userInfo }>
            <h2 className={ styles.title }>User Info: </h2>
            <h3 className={ styles.subtitle }>Email: </h3>
            { email }
            <h3 className={ styles.subtitle }>Name: </h3>
            { name }
        </div>
    );
};
