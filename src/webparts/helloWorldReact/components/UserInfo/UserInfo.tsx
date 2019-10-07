import * as React from 'react';

type UserInfoProps = {
    email: string,
    name: string
};

export const UserInfo: React.FunctionComponent<UserInfoProps> = ({email, name}: UserInfoProps) => {
    return (
        <div>
            <h2>User Info: </h2>
            <h3>Email: </h3>
            {email}
            <h3>Name: </h3>
            {name}
        </div>
    );
};