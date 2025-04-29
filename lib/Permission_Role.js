import { db } from "@/config/db";
import { PermissionModel } from "@/schema/Permission";
import { RoleModel } from "@/schema/Role";

export async function assignPermissionsToRole(roleName, permissionNames) {
    await db();
  
    try {
      // Find the role
      const role = await RoleModel.findOne({ name: roleName });
      if (!role) throw new Error("Role not found");
  
      // Find all the permissions by name
      const permissions = await PermissionModel.find({
        name: { $in: permissionNames }
      });
  
      if (permissions.length === 0) throw new Error("No permissions found");
  
      // Map permission _id's
      const permissionIds = permissions.map((perm) => perm._id);
  
      // Update role
      role.permission = permissionIds;
      await role.save();
  
      console.log(`Permissions assigned to role '${roleName}'`);
      return role;
    } catch (err) {
      console.error("Error assigning permissions to role:", err);
      throw new Error(err.message || "Failed to assign permissions");
    }
  }