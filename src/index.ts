import * as BC from 'broadcast-channel';
import EventEmitter from '@3xpo/events';

export class LeaderElector extends EventEmitter<{
  duplicate: () => void;
}> {
  /**
    * Creates a new LeaderElector instance.
    * @param {BroadcastChannel} broadcastChannel The BroadcastChannel instance.
    * @param {LeaderElectionOptions} [options] The options for the LeaderElector instance.
    */
  public static createaLeaderElection(broadcastChannel: BroadcastChannel, options?: BC.LeaderElectionOptions) {
    return new LeaderElector(broadcastChannel, options);
  }

  //

  /**
    * The LeaderElector instance.
    * @internal
    */
  public readonly leaderElector: BC.LeaderElector;
  /**
    * The owner BroadcastChannel instance.
    * @internal
    */
  public readonly broadcastChannel: BroadcastChannel;

  //

  /**
    * @constructor LeaderElector
    */
  constructor(broadcastChannel: BroadcastChannel, options?: BC.LeaderElectionOptions) {
    super();
    this.broadcastChannel = broadcastChannel;
    this.leaderElector = BC.createLeaderElection(broadcastChannel.channel, options);
    this.leaderElector.onduplicate = () => {
      this.emit('duplicate');
    }
  }

  /**
    * Returns true if this or another instance is leader.
    * False if there is no leader at the moment
    * and we must wait for the election.
    */
  public hasLeader(): Promise<boolean> {
    return this.leaderElector.hasLeader();
  }

  /**
    * IMPORTANT: The leader election is lazy,
    * it will not start before you call awaitLeadership()
    * so isLeader will never become true then.
    */
  public get isLeader(): boolean {
    return this.leaderElector.isLeader;
  }

  /**
    * Returns true if the leader is dead.
    */
  public get isDead(): boolean {
    return this.leaderElector.isDead;
  }

  /**
    * Returns the token of the leader.
    */
  public get token(): string {
    return this.leaderElector.token;
  }

  /**
    * Apply for leadership once.
    * @param {boolean} [isFromFallbackInterval] Whether the call is from the fallback interval.
    */
  public applyOnce(isFromFallbackInterval?: boolean): Promise<boolean> {
    return this.leaderElector.applyOnce(isFromFallbackInterval);
  }

  /**
    * Await leadership.
    */
  public awaitLeadership(): Promise<void> {
    return this.leaderElector.awaitLeadership();
  }

  /**
    * Let the leader die. (automatically happens if a tab is closed or the process exits).
    * Also removes all event listeners.
    * @returns {Promise<void>} A promise that resolves when the leader has died.
    */
  public die(): Promise<void> {
    const promise = this.leaderElector.die();
    promise.then(() => this.removeAllListeners())
    return promise;
  }

  /**
    * Close the LeaderElector instance.
    */
  public close(): Promise<void> {
    return this.die();
  }
}

export class BroadcastChannel<Message = any> extends EventEmitter<{
  message: (message: Message) => void;
}> {
  public static createaLeaderElection(broadcastChannel: BroadcastChannel, options?: BC.LeaderElectionOptions) {
    return new LeaderElector(broadcastChannel, options);
  }

  /** {@link BC.clearNodeFolder Type} | {@link https://github.com/pubkey/broadcast-channel/tree/master#clear-tmp-folder Docs} */
  public static clearNodeFolder = BC.clearNodeFolder;
  /** {@link BC.enforceOptions Type} | {@link https://github.com/pubkey/broadcast-channel/tree/master#enforce-options-globally Docs} */
  public static enforceOptions = BC.enforceOptions;
  /** Used when constructing the inner channel - Replacing this with a class that does not extend BroadcastChannel voids all typesafety */
  public static rawChannel = BC.BroadcastChannel;

  //

  /**
    * The BroadcastChannel instance.
    * @internal
    */
  public readonly channel: BC.BroadcastChannel<Message>;

  /**
    * The name of the channel.
    */
  public readonly channelName: string;

  /**
    * @constructor BroadcastChannel
    * @param {string} channelName The name of the channel.
    */
  constructor(channelName: string) {
    super();
    this.channelName = channelName;
    this.channel = new BroadcastChannel.rawChannel(channelName);
    this.channel.onmessage = (v) => {
      this.emit('message', v);
    }
    this.channel.addEventListener('leader', (ev) => {
      console.log('leader', ev);
    })
  }

  //

  /**
    * Sends a message to the channel.
    * @param {any} message The message to send.
    */
  public postMessage(message: any): Promise<void> {
    return this.channel.postMessage(message);
  }
  /**
    * Sends a message to the channel.
    * @param {any} message The message to send.
    */
  public send(message: any): Promise<void> {
    return this.postMessage(message);
  }

  /**
    * Closes the channel and removes all event listeners.
    * Call this when you are done with the channel.
    */
  public async close(): Promise<void> {
    const rt = await this.channel.close();
    this.removeAllListeners();
    return rt;
  }

  /**
    * Closes the channel and removes all event listeners.
    * Call this when you are done with the channel.
    */
  public destroy(): Promise<void> {
    return this.close();
  }
}