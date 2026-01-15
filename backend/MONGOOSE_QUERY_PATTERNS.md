# Mongoose Query Patterns - Quick Reference

## 🔍 Pattern Recognition

### ✅ NO Curly Braces (ID Methods)

Methods that contain **"ById"** in their name take the ID directly:

```javascript
// Pattern: Model.findById*(id, ...)
Model.findById(id); // ✅ Correct
Model.findByIdAndUpdate(id, data); // ✅ Correct
Model.findByIdAndDelete(id); // ✅ Correct
```

**Hint:** If the method name has "ById", pass the ID string directly.

---

### ✅ YES Curly Braces (Query Methods)

Methods that **don't** have "ById" need a query object:

```javascript
// Pattern: Model.find*({ field: value }, ...)
Model.findOne({ _id: id }); // ✅ Correct
Model.findOne({ name: "John" }); // ✅ Correct
Model.find({ country: "USA" }); // ✅ Correct
Model.findOneAndUpdate({ _id: id }, data); // ✅ Correct
Model.findOneAndDelete({ _id: id }); // ✅ Correct
```

**Hint:** If the method name has "find" or "findOne" but NOT "ById", use curly braces with a query object.

---

## 📚 When to Check Documentation

### Always Check Docs For:

1. **New methods you haven't used before**
2. **Complex queries** (aggregation, population, etc.)
3. **Options/parameters** (what's the 3rd parameter? what options are available?)
4. **Edge cases** (validation, casting, etc.)

### Quick Documentation Check:

- **Official Mongoose Docs:** https://mongoosejs.com/docs/api/model.html
- **Search pattern:** "mongoose [method name]" in Google
- **Look for:** Method signature in docs

---

## 🎯 Common Patterns in Your Codebase

### Finding by ID:

```javascript
// Option 1: Using findById (no curly braces)
const doc = await Model.findById(id);

// Option 2: Using findOne with query (curly braces)
const doc = await Model.findOne({ _id: id });
```

**Both work, but `findById` is simpler and more efficient for ID lookups.**

### Finding by other fields:

```javascript
// Always use curly braces for field queries
const doc = await Model.findOne({ name: "John" });
const docs = await Model.find({ country: "USA" });
```

### Updating:

```javascript
// By ID (no curly braces)
await Model.findByIdAndUpdate(id, { name: "New Name" });

// By query (curly braces)
await Model.findOneAndUpdate({ email: "user@example.com" }, { name: "New Name" });
```

---

## 💡 Memory Tricks

1. **"ById" = Direct ID** → No curly braces needed
2. **"find" or "findOne" without "ById"** → Needs curly braces (query object)
3. **If unsure** → Check Mongoose docs or use `findOne({ _id: id })` which always works

---

## 🔗 Useful Links

- [Mongoose Query API](https://mongoosejs.com/docs/api/query.html)
- [Mongoose Model API](https://mongoosejs.com/docs/api/model.html)
- [Mongoose Queries Guide](https://mongoosejs.com/docs/queries.html)
