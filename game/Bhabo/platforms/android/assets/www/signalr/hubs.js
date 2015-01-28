/*!
 * ASP.NET SignalR JavaScript Library v2.1.2
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies['chatHub'] = this.createHubProxy('chatHub'); 
        proxies['chatHub'].client = { };
        proxies['chatHub'].server = {
            joinRoom: function (groupName, userName) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["JoinRoom"], $.makeArray(arguments)));
             },

            leaveRoom: function (groupName, userName, connectionId) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["LeaveRoom"], $.makeArray(arguments)));
             },

            registerUser: function (uniqueId, userName) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RegisterUser"], $.makeArray(arguments)));
             },

            removeUser: function (name) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["RemoveUser"], $.makeArray(arguments)));
             },

            send: function (name, to, message) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["Send"], $.makeArray(arguments)));
             },

            sendGroupMessage: function (grpName, name, message) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendGroupMessage"], $.makeArray(arguments)));
             },

            sendNotification: function (deviceId, message) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendNotification"], $.makeArray(arguments)));
             },

            sendOfflineMessage: function (sender, receiver, message) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendOfflineMessage"], $.makeArray(arguments)));
             },

            sendPersonalMessage: function (name, message, sender) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["SendPersonalMessage"], $.makeArray(arguments)));
             },

            updateConnId: function (old, newid, name) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["UpdateConnId"], $.makeArray(arguments)));
             },

            updateName: function (connId, name) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["UpdateName"], $.makeArray(arguments)));
             },

            updateUserGCMID: function (name, GCMID) {
                return proxies['chatHub'].invoke.apply(proxies['chatHub'], $.merge(["UpdateUserGCMID"], $.makeArray(arguments)));
             }
        };

        proxies['gameHub'] = this.createHubProxy('gameHub'); 
        proxies['gameHub'].client = { };
        proxies['gameHub'].server = {
            asktimeOut: function (userName, groupname, card) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["AsktimeOut"], $.makeArray(arguments)));
             },

            distCards: function () {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["DistCards"], $.makeArray(arguments)));
             },

            firstTurnMessage: function (groupName, user) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["FirstTurnMessage"], $.makeArray(arguments)));
             },

            joinGame: function (name) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["JoinGame"], $.makeArray(arguments)));
             },

            register: function (name) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["Register"], $.makeArray(arguments)));
             },

            registerUser: function (uniqueId, userName) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["RegisterUser"], $.makeArray(arguments)));
             },

            sendMessage: function (groupName, user, message) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["SendMessage"], $.makeArray(arguments)));
             },

            sendOfflineMessage: function (sender, receiver, message) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["SendOfflineMessage"], $.makeArray(arguments)));
             },

            startGame: function (grpCnt, groupName) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["StartGame"], $.makeArray(arguments)));
             },

            throwCard: function (card, username, groupname, lastCard, cardTurnType) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["ThrowCard"], $.makeArray(arguments)));
             },

            updateConnId: function (old, newid, name) {
                return proxies['gameHub'].invoke.apply(proxies['gameHub'], $.merge(["UpdateConnId"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));