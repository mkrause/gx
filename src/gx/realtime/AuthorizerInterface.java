package gx.realtime;

import com.google.api.client.auth.oauth2.Credential;

/**
 *
 */
public interface AuthorizerInterface
{
    /**
     * Obtains credentials using the preferred authorization method.
     *
     * @return
     * @throws Exception
     */
    Credential authorize() throws Exception;
}
