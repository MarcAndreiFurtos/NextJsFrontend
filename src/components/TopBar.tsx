'use client'

import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@/components/ui/button";

export function TopBar() {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div className="fixed top-0 left-0 right-0 h-14 bg-primary z-50 flex items-center px-4">
            {isAuthenticated ? (
                <Button
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    variant="secondary"
                >
                    Log Out
                </Button>
            ) : (
                <Button onClick={() => loginWithRedirect()} variant="secondary">
                    Log In
                </Button>
            )}
        </div>
    );
}

