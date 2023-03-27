import { withAuthenticator, } from "@aws-amplify/ui-react";
import { Amplify, Auth } from "aws-amplify";
import awsmobile from "../../aws-exports";

Amplify.configure(awsmobile);

// create a higher order component that wraps the page component

export default function withAuthenticatorPage(PageComponent: any) {
    return withAuthenticator(PageComponent);
    }


