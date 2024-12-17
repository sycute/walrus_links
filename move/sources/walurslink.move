
module walurslink::walurslink {
    use std::string::String;
    use sui::table;
    use sui::transfer::public_share_object;

    public struct WalursLog has key, store {
        id: UID,
        tables: table::Table<address, DescEntry>,
    }

    public struct DescEntry has store,drop{
        name: String,
        desc: String,
    }

    public fun new_log(ctx: &mut TxContext): WalursLog {
        WalursLog {
            id: object::new(ctx),
            tables: table::new(ctx),
        }
    }

    #[allow(lint(share_owned))]
    public fun share_log(log: WalursLog) {
        public_share_object(log);
    }

    public fun add_to_log(log: &mut WalursLog, site_obj: address, name: String, desc: String, _ctx: &mut TxContext) {
        table::add(&mut log.tables, site_obj, DescEntry {
           name,
           desc,
       });
    }

    public fun remove_from_log(log: &mut WalursLog, site_obj: address, _ctx: &mut TxContext) {
       table::remove(&mut log.tables, site_obj);
    }
}
