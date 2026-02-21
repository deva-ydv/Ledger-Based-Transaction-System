const mongoose = require('mongoose')

const ledgerSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Ledger must be associated with an account"],
        index: true,
        immutable: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required for creating a ledger entry"],
        immutable: true,
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "Ledger must be associated with an account"],
        index: true,
        immutable: true,
    },
    type:{
        type: String,
        enum:{
            values: ["CREDIT", "DEBIT"],
            type: 'Type can be either CREDIT OR DEBIT'
        },
        required: [true, "Ledger type is required"],
        immutable: true,
    }

},{timestamps: true})


function preventLedgerModification() {
    throw new Error("Ledger entries are immutable and cannot be modified or deleted");
}

// Update operations
ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre('findOneAndReplace', preventLedgerModification); // Added

// Delete operations
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('findOneAndDelete', preventLedgerModification); // Added
ledgerSchema.pre('remove', preventLedgerModification);

const ledgerModel = mongoose.model('ledger', ledgerSchema);

module.exports = ledgerModel